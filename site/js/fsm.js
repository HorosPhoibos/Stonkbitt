/* Ritelrasional.app — state machine kecil & eksplisit.
   Setiap interaksi yang punya "keadaan" (menu, popover, tema, bacakan, ronde lab, kuis, stepper, flashcard, data indikator)
   didefinisikan sebagai tabel transisi. Event yang tidak sah di state saat ini diabaikan (dan dicatat), sehingga
   klik ganda / timer terlambat tidak bisa merusak tampilan.

   DX  : satu pola untuk semua; transisi bisa dibaca di satu tempat; lihat docs/STATE_MACHINES.md.
   AX  : setiap machine menulis data-machine & data-state ke elemen yang di-bind, dan terdaftar di
         window.Machines (list(), get(id).state, .events() = event yang didefinisikan, .enabled() = yang lolos guard
         tanpa payload, .can(ev,payload), .send(ev,payload)) — agen bisa membaca & menggerakkan UI tanpa menebak.
   UX  : state yang jelas → tombol yang tidak berlaku dinonaktifkan, label selalu sesuai keadaan.

   Definisi:
   Machines.create({ id, initial, context, states: {
     nama: { enter(ctx,payload,m), exit(ctx,payload,m), on: { EVENT: "target" | { target, guard(ctx,payload), action(ctx,payload,m) } } }
   }}, { register: true })
*/
(function(){
const registry=new Map();
const DEBUG=(()=>{ try{ return localStorage.getItem("rr_debug_fsm")==="1"; }catch(e){ return false; } })();

function create(def, opts={}){
  if(!def||!def.states||!(def.initial in def.states)) throw new Error("FSM: definisi tidak valid untuk "+(def&&def.id));
  let state=def.initial;
  const ctx=Object.assign({}, def.context||{}, opts.context||{});
  const subs=new Set(), els=new Set(), hist=[];
  const trans=(st,ev)=>{ const t=def.states[st]&&def.states[st].on&&def.states[st].on[ev]; return t==null?null:(typeof t==="string"?{target:t}:t); };
  const reflect=()=>{ els.forEach(el=>{ if(!el.isConnected){ els.delete(el); return; } el.dataset.machine=def.id; el.dataset.state=state; }); };
  const m={
    id:def.id,
    get state(){ return state; },
    get context(){ return ctx; },
    is:(...names)=>names.includes(state),
    events:()=>Object.keys((def.states[state]&&def.states[state].on)||{}),
    enabled:()=>Object.keys((def.states[state]&&def.states[state].on)||{}).filter(ev=>m.can(ev)),
    can(ev,payload){ const t=trans(state,ev); return !!t && (!t.guard||!!t.guard(ctx,payload)); },
    send(ev,payload){
      const t=trans(state,ev);
      if(!t || (t.guard && !t.guard(ctx,payload))){ if(DEBUG) console.debug(`[fsm:${def.id}] abaikan ${ev} di state "${state}"`); return false; }
      const from=state, to=t.target==null?state:t.target, changed=to!==from;
      if(changed && def.states[from].exit) def.states[from].exit(ctx,payload,m);
      if(t.action) t.action(ctx,payload,m);
      state=to;
      hist.push({t:Date.now(),ev,from,to}); if(hist.length>30) hist.shift();
      if(changed && def.states[to].enter) def.states[to].enter(ctx,payload,m);
      reflect(); subs.forEach(f=>{ try{ f(state,from,ev,ctx); }catch(e){ console.error(e); } });
      if(DEBUG) console.debug(`[fsm:${def.id}] ${from} --${ev}--> ${state}`);
      return true;
    },
    bind(el){ if(el){ els.add(el); reflect(); } return m; },
    subscribe(f){ subs.add(f); return ()=>subs.delete(f); },
    history:()=>hist.slice(),
    definition:()=>Object.fromEntries(Object.entries(def.states).map(([k,v])=>[k,Object.fromEntries(Object.entries(v.on||{}).map(([e,t])=>[e,typeof t==="string"?t:(t.target==null?k:t.target)]))])),
  };
  if(opts.register!==false) registry.set(def.id,m);
  if(def.states[state].enter && opts.runInitialEnter) def.states[state].enter(ctx,undefined,m);
  return m;
}

/* ---------- Kuis: belum dijawab → terjawab (benar/salah). Satu implementasi untuk semua kuis. ----------
   QuizUI.bind(box, { buttons:"button[data-a]", key:b=>b.dataset.a, correct:(key)=>"kunciBenar", onAnswer:(key,ok,correctKey)=>{} })
   - jawaban hanya diterima sekali (klik ganda diabaikan)
   - tombol diberi aria-pressed, lalu dinonaktifkan setelah menjawab; box mendapat data-state="answered" & data-result
   - elemen .ex (penjelasan) menjadi live region agar diumumkan pembaca layar */
function quiz(box, o){
  if(!box) return null;
  const sel=o.buttons||"button";
  const btns=()=>[...box.querySelectorAll(sel)];
  const keyOf=o.key||(b=>b.dataset.a);
  const ex=box.querySelector(".ex"); if(ex){ ex.setAttribute("role","status"); ex.setAttribute("aria-live","polite"); }
  const m=create({ id:"quiz", initial:"open", states:{
    open:{ on:{ ANSWER:{ target:"answered", action:(ctx,p)=>{ ctx.key=p.key; ctx.correct=typeof o.correct==="function"?o.correct(p.key):o.correct; ctx.ok=ctx.key===ctx.correct; } } } },
    answered:{ enter:(ctx)=>{
      btns().forEach(b=>{ const k=keyOf(b); b.setAttribute("aria-pressed", k===ctx.key?"true":"false");
        if(k===ctx.correct) b.classList.add("right"); else if(k===ctx.key) b.classList.add("wrong"); b.disabled=true; });
      box.dataset.result=ctx.ok?"correct":"wrong";
      if(o.onAnswer) o.onAnswer(ctx.key,ctx.ok,ctx.correct);
    }, on:{} } } }, {register:false});
  m.bind(box);
  btns().forEach(b=>{ b.setAttribute("aria-pressed","false"); b.addEventListener("click",()=>m.send("ANSWER",{key:keyOf(b)})); });
  return m;
}

window.Machines={
  create,
  get:id=>registry.get(id)||null,
  list:()=>[...registry.values()].map(m=>({id:m.id,state:m.state,events:m.events(),enabled:m.enabled()})),
};
window.QuizUI={bind:quiz};
})();
