/* English version of the A–G curriculum (same lesson ids as lessons.js). */
window.MODULES_EN = [
{ id:"A", t:"Indonesia Stock Exchange Basics", d:"How the market works: who's who, units, price rules, hours, costs, corporate actions.", lessons:[
{ id:"a1", t:"The capital-market ecosystem: who does what", m:8,
inti:"You buy shares through a <b>broker (Exchange Member)</b>, orders are matched at <b>IDX</b>, settlement is guaranteed by <b>KPEI</b>, and the shares are held at <b>KSEI</b> under your SID. Everything is supervised by <b>OJK</b>.",
body:`
<div class="tablewrap"><table><tr><th>Institution</th><th>Role</th><th>What you notice</th></tr>
<tr><td><b>OJK</b></td><td>Regulator & supervisor (Capital Market Law, P2SK Law)</td><td>Broker licences, manipulation sanctions, investor protection</td></tr>
<tr><td><b>IDX (BEI)</b></td><td>Runs trading (JATS)</td><td>Trading hours, tick sizes, price limits, suspensions, UMA notices</td></tr>
<tr><td><b>KPEI</b></td><td>Clearing & guarantee</td><td>Trades still settle even if the counterparty defaults</td></tr>
<tr><td><b>KSEI</b></td><td>Central depository</td><td>SID, securities accounts, AKSes (check your holdings directly)</td></tr>
<tr><td><b>Exchange Members</b></td><td>Brokers / securities firms</td><td>Trading apps, fees, 2-letter broker codes (YP, PD, AK…)</td></tr>
<tr><td><b>RDN bank</b></td><td>Investor cash account</td><td>Your money is separate from the broker's</td></tr></table></div>
<h3>T+2 settlement</h3>
<p>Regular-market trades settle <b>2 trading days</b> after the trade. Buy Monday → shares and payment settle Wednesday. This matters for dividend cum dates and for knowing when sale proceeds can be withdrawn.</p>
<h3>SID vs sub-accounts</h3>
<p>Each person has one <b>SID</b> (Single Investor Identification) but can hold sub-accounts at several brokers. The SID is how the exchange knows whether a trade is by a <b>domestic</b> or <b>foreign</b> investor — <u>not</u> the broker. (Key for Module F.)</p>`,
trap:"Assuming a foreign broker = a foreign investor. YP (Mirae) is Korean-owned but most of its clients are local retail. Foreign status comes from the investor type, not the broker's ownership.",
prak:"Log in to KSEI AKSes (akses.ksei.co.id) and reconcile your holdings with your app. Do it at least once a year.",
ref:"OJK, IDX and KSEI websites; Capital Market Law (Law 8/1995 as amended by Law 4/2023 P2SK)." },

{ id:"a2", t:"Lots, tick sizes, price limits (ARA/ARB), listing boards", m:12,
inti:"1 lot = 100 shares. Prices move only in fixed <b>tick sizes</b>. Daily moves are capped by the <b>upper limit (ARA)</b> and <b>lower limit (ARB)</b>. Each listing board has its own rules.",
body:`
<h3>Tick sizes</h3>
<div class="tablewrap"><table><tr><th>Price range</th><th>Tick</th><th>Example</th></tr>
<tr><td>&lt; Rp200</td><td class="num">Rp1</td><td class="num">150 → 151</td></tr>
<tr><td>Rp200 – &lt; Rp500</td><td class="num">Rp2</td><td class="num">342 → 344</td></tr>
<tr><td>Rp500 – &lt; Rp2,000</td><td class="num">Rp5</td><td class="num">940 → 945</td></tr>
<tr><td>Rp2,000 – &lt; Rp5,000</td><td class="num">Rp10</td><td class="num">3,380 → 3,390</td></tr>
<tr><td>≥ Rp5,000</td><td class="num">Rp25</td><td class="num">5,325 → 5,350</td></tr></table></div>
<p>Why it matters: one tick is a different percentage at each price. At 5,000 one tick = 0.5%. At 200 (tick 2) = 1%. At 50 = 2%. Cheap stocks "jump" more.</p>
<h3>Auto-rejection limits</h3>
<p>The general upper limit (Main/Development/New Economy boards), from the reference price (yesterday's close):</p>
<div class="tablewrap"><table><tr><th>Reference price</th><th>Upper limit</th></tr>
<tr><td>Rp50 – Rp200</td><td>35%</td></tr><tr><td>&gt; Rp200 – Rp5,000</td><td>25%</td></tr><tr><td>&gt; Rp5,000</td><td>20%</td></tr></table></div>
<div class="note warn"><b>2026 rules keep changing.</b> From 28 Sep 2026 IDX lowered the minimum share price to Rp1. From 19 Oct 2026 IDX applied an <b>asymmetric 7% lower limit</b> (until 31 Dec 2026, to be reviewed), and stocks priced Rp11–14 have a Rp1 lower limit. IDX has also said it plans to return to symmetric limits. Always check the latest decree at idx.co.id → Regulations, or read the ARA/ARB values your app shows.</div>
<h3>Listing boards</h3>
<ul>
<li><b>Main</b> — large, established issuers (BBCA, ASII, TLKM).</li>
<li><b>Development</b> — issuers not yet meeting Main board criteria.</li>
<li><b>Acceleration</b> — small/medium assets; different price and limit rules.</li>
<li><b>New Economy</b> — tech companies with special structures.</li>
<li><b>Special Monitoring</b> — problem stocks (very illiquid, negative equity, certain notations). Traded by <b>Full Call Auction (FCA)</b>: orders are collected, then matched at one price. An FCA order book cannot be read like a normal one.</li></ul>
<h3>Special notations & UMA</h3>
<p>Letters after a ticker (e.g. <code>E</code> negative equity, <code>L</code> late financial statements, <code>X</code> special monitoring) are warnings. <b>UMA (Unusual Market Activity)</b> is an IDX notice about abnormal price/volume moves — often a precursor to a <b>suspension</b>. Many pumped stocks get UMA notices.</p>`,
trap:"Placing an order at a price that doesn't fit the tick size — it gets rejected. Or assuming the 25% upper limit applies to every board and period.",
prak:"Open 5 stocks in different price ranges. Work out the upper limit yourself and compare it with your app. Use the calculator in Tools.",
ref:"IDX Rule II-A; IDX announcements of 21 Sep and 19–20 Oct 2026." },

{ id:"a3", t:"Trading hours, sessions, regular vs negotiated market", m:9,
inti:"The most 'honest' order book is in the continuous sessions. Pre-opening and pre-closing use call auctions — where queue games happen, which is why IDX introduced a <b>non-cancellation period</b>.",
body:`
<div class="tablewrap"><table><tr><th>Phase</th><th>Mon–Thu</th><th>Fri</th><th>Notes</th></tr>
<tr><td>Pre-opening</td><td class="num">08:45–08:58</td><td class="num">08:45–08:58</td><td>Orders entered; from 08:56 they cannot be amended/cancelled</td></tr>
<tr><td>Session I</td><td class="num">09:00–12:00</td><td class="num">09:00–11:30</td><td>Continuous auction</td></tr>
<tr><td>Session II</td><td class="num">13:30–15:49</td><td class="num">14:00–15:49</td><td>Continuous auction</td></tr>
<tr><td>Pre-closing</td><td class="num">15:50–16:00</td><td class="num">15:50–16:00</td><td>Closing auction; non-cancellation from 15:56, random close</td></tr>
<tr><td>Post-trading</td><td class="num">16:01–16:15</td><td class="num">16:01–16:15</td><td>Trades at the closing price</td></tr></table></div>
<p class="hint">Summarised from Rule II-A (Kep-00003/BEI/04-2025) and the 15 Dec 2025 non-cancellation rule. IDX has studied adding 30 minutes — check idx.co.id for changes.</p>
<h3>Regular, Negotiated, Cash markets</h3>
<ul><li><b>Regular</b>: the normal order book; prices must fit ticks & limits. This is what you read.</li>
<li><b>Negotiated (crossing)</b>: pre-agreed block trades outside the order book. Used by institutions, crossings, share transfers. Can <b>distort foreign data</b> — a Rp1T net foreign buy may be a single negotiated trade.</li>
<li><b>Cash</b>: T+0 settlement for special cases.</li></ul>
<h3>IEP & IEV in auctions</h3>
<p>During pre-opening/closing, apps show the <b>IEP</b> (indicative equilibrium price) and <b>IEV</b> (volume). These can be gamed with large orders pulled before 08:56 — the reason for the non-cancellation period.</p>`,
trap:"Reading a 'big foreign net buy' without separating regular from negotiated trades. Always check for large negotiated deals that day.",
prak:"Tomorrow morning, watch one stock's IEP from 08:45 to 08:58. Note how it changes before and after 08:56.",
ref:"IDX Rule II-A; Non-Cancellation Period FAQ." },

{ id:"a4", t:"Order types, fees and transaction tax", m:8,
inti:"On IDX every order is really a <b>limit order</b>. Auto-buy, take-profit, stop-loss and trailing features are broker-app tools that send a limit order when conditions are met.",
body:`
<h3>Typical costs (check your broker)</h3>
<div class="tablewrap"><table><tr><th>Component</th><th>Buy</th><th>Sell</th></tr>
<tr><td>Broker fee + IDX/KPEI/KSEI levies + VAT</td><td>~0.15%</td><td>~0.15%</td></tr>
<tr><td>Final income tax on share sales</td><td>–</td><td>0.10% of sale value</td></tr>
<tr><td><b>Approx. total</b></td><td>~0.15%</td><td>~0.25%</td></tr></table></div>
<p>So price must rise about <b>0.4%</b> just to break even. At Rp5,000 that's ~1 tick. Compute exactly in the <a href="#/tools?t=fee">Fee & Break-even calculator</a>.</p>
<h3>HAKA & HAKI</h3>
<ul><li><b>HAKA</b> ("hit right"): buying straight at the offer → recorded as <span class="up">Buy</span>. Impatient buyers.</li>
<li><b>HAKI</b> ("hit left"): selling straight into the bid → recorded as <span class="down">Sell</span>. Impatient sellers.</li>
<li><b>Queueing</b>: placing a bid (buy) or offer (sell) and waiting. These queues are what the order book shows.</li></ul>`,
trap:"Scalping 1 tick in Rp500–2,000 stocks (tick 5) — ~0.4% fees can exceed one tick (0.25–1%). Do the maths first.",
prak:"Look at your trade history and total your fees for the last year. Many traders are surprised.",
ref:"Your broker's fee schedule; Government Regulation 41/1994 (tax on share transactions)." },

{ id:"a5", t:"Corporate actions: dividends, rights issues, splits, buybacks, IPOs", m:12,
inti:"Corporate actions change share counts and theoretical prices. Big players often use these moments (e.g. rights issues) — know the dates and formulas.",
body:`
<h3>Cash dividends</h3>
<ol><li><b>Cum date</b> — last day to buy in the regular market to receive the dividend.</li>
<li><b>Ex date</b> — the next day; price usually drops by roughly the dividend.</li>
<li><b>Recording date</b> — T+2 from cum (because of settlement).</li>
<li><b>Payment date</b> — cash arrives in your RDN.</li></ol>
<p>Dividend tax for resident individuals: <b>10% final</b>, or <b>exempt</b> if reinvested in Indonesia under the applicable rules (HPP Law & related regulations). Many brokers withhold 10% upfront.</p>
<h3>Rights issue</h3>
<div class="formula">Theoretical price = (N_old × P_cum + N_new × P_exercise) ÷ (N_old + N_new)</div>
<p>Example: 2:1 ratio (1 right per 2 shares), cum price 1,000, exercise 700 → (2×1,000 + 1×700)/3 = <b>900</b>. If you don't exercise, you're diluted.</p>
<h3>Stock split / reverse split</h3><p>Total value is unchanged; share count and per-share price change. Splits usually raise liquidity and trade frequency.</p>
<h3>Buyback</h3><p>The issuer buys its own shares — management signalling the price is cheap, plus extra demand in the book.</p>
<h3>Tender offer & going private</h3><p>The controller offers to buy at a set price. The stock usually sticks just below the tender price.</p>
<h3>IPO (e-IPO)</h3><p>Fixed vs pooled allotment. Small IPOs are often played in the first days (several upper-limit days, then several lower-limit days) — the order book and broker summary are very useful here.</p>`,
trap:"Buying the day before the cum date for a 3% dividend, then losing 3% on the ex date plus 10% tax plus fees. Dividends aren't free money.",
prak:"Find a stock going ex this month. Record the cum-date close vs the ex-date open.",
ref:"Berk & DeMarzo, Corporate Finance (payout policy); KSEI rules; Rights Issue calculator in Tools." },
]},

{ id:"B", t:"Fundamental Analysis", d:"Knowing WHAT you buy: statements, ratios, valuation, earnings quality, macro.", lessons:[
{ id:"b1", t:"Reading the three financial statements in 15 minutes", m:15,
inti:"Balance sheet = what the company owns and how it's funded. Income statement = performance over a period. Cash flow statement = cash that actually moved. Profits can be dressed up; <b>cash is much harder to fake</b>.",
body:`
<h3>My quick order</h3>
<ol><li><b>Income statement</b>: is revenue growing? Is gross margin stable? Operating vs net profit (large 'other' items?).</li>
<li><b>Operating cash flow (CFO)</b> vs net profit: CFO below profit year after year = amber light.</li>
<li><b>Capex & free cash flow</b> (CFO − capex): are dividends paid from FCF or from debt?</li>
<li><b>Balance sheet</b>: interest-bearing debt, cash, receivables & inventory (growing faster than sales?), goodwill.</li>
<li><b>Notes</b> to the accounts: related parties, revenue recognition policy, contingencies, segments.</li></ol>
<h3>For banks (BBCA, BBRI, BMRI, BBNI)</h3>
<p>Bank statements differ. The main income is <b>net interest income</b>. Look at NIM, CASA, NPL/LAR, cost of credit, LDR, CAR, cost-to-income. (Formulas in b2.)</p>`,
trap:"Judging by net profit alone. Profit can jump from a one-off asset sale, FX gains or revaluations.",
prak:"Take one issuer's annual report (idx.co.id → Financial Statements). Fill in revenue, net profit, CFO and capex for 5 years.",
ref:"Berk & DeMarzo ch. 2; Koller et al., Valuation (McKinsey) on reorganising financial statements." },

{ id:"b2", t:"Key ratios (general & bank-specific)", m:14,
inti:"Ratios are for comparison — across years and against similar companies. A single ratio on its own means little.",
body:`
<div class="tablewrap"><table><tr><th>Ratio</th><th>Formula</th><th>Reading</th></tr>
<tr><td>ROE</td><td class="mono">Net profit / Average equity</td><td>Efficiency of shareholders' capital. Consistently &gt;15% = good</td></tr>
<tr><td>ROA</td><td class="mono">Net profit / Total assets</td><td>Banks: &gt;1.5% is good</td></tr>
<tr><td>Net margin</td><td class="mono">Net profit / Revenue</td><td>Compare with peers</td></tr>
<tr><td>D/E</td><td class="mono">Interest-bearing debt / Equity</td><td>Non-banks: &gt;1.5x caution (sector-dependent)</td></tr>
<tr><td>Current ratio</td><td class="mono">Current assets / Current liabilities</td><td>&lt;1 = liquidity risk</td></tr>
<tr><td>Interest coverage</td><td class="mono">EBIT / Interest expense</td><td>&lt;2x is vulnerable to rate hikes</td></tr>
<tr><td>FCF yield</td><td class="mono">FCF / Market cap</td><td>The business's "cash yield"</td></tr></table></div>
<h3>DuPont (decomposing ROE)</h3>
<div class="formula">ROE = Net margin × Asset turnover × Leverage (Assets/Equity)</div>
<p>High ROE from leverage is lower quality than high ROE from margins.</p>
<h3>Bank ratios</h3>
<div class="tablewrap"><table><tr><th>Ratio</th><th>Meaning</th></tr>
<tr><td>NIM</td><td>Net interest income / average earning assets</td></tr>
<tr><td>CASA</td><td>(Current + savings accounts) / third-party funds — higher means cheaper funding (BBCA's edge)</td></tr>
<tr><td>NPL / LAR</td><td>Non-performing / at-risk loans — asset quality</td></tr>
<tr><td>Cost of credit</td><td>Provision expense / average loans</td></tr>
<tr><td>LDR</td><td>Loans / deposits — room to grow lending</td></tr>
<tr><td>CAR</td><td>Capital / risk-weighted assets — loss buffer</td></tr>
<tr><td>Cost-to-income</td><td>Cost efficiency</td></tr></table></div>`,
trap:"Comparing a bank's D/E with a manufacturer's. Banks 'borrow' deposits as their raw material.",
prak:"Compare NIM, CASA, NPL and ROE for BBCA, BBRI, BMRI, BBNI from the latest quarter.",
ref:"CFA L1 FSA; Damodaran, Investment Valuation (banks & financial services)." },

{ id:"b3", t:"Relative valuation: P/E, P/B, EV/EBITDA, dividend yield", m:12,
inti:"Cheap or expensive is relative — to the stock's own history (P/E or P/B bands), to peers, and to its growth.",
body:`
<div class="formula">P/E = Price / EPS          P/B = Price / BVPS
EV  = Market cap + Interest-bearing debt − Cash
Dividend yield = DPS / Price</div>
<h3>Historical P/E and P/B bands</h3>
<p>Compute the 5–10-year average P/E and its standard deviation. Prices near <b>−1 SD</b> are often accumulation zones for quality stocks — <i>if</i> the fundamentals haven't changed (a bank with sharply rising NPLs deserves a lower P/B).</p>
<h3>When to use which</h3>
<ul><li><b>P/B</b>: banks, insurers, property (assets drive value). Fair: P/B ≈ (ROE − g)/(COE − g).</li>
<li><b>P/E</b>: companies with stable earnings (consumer, telco).</li>
<li><b>EV/EBITDA</b>: capital-intensive or differently levered firms (mining, cement, telco).</li>
<li><b>Dividend yield</b>: defensive and high-payout state-owned companies.</li></ul>
<h3>PEG</h3><p>P/E ÷ EPS growth (%). A P/E of 20 with 20% growth (PEG 1) can be cheaper than a P/E of 10 with 2% growth (PEG 5).</p>`,
trap:"Value traps: a P/E of 4 looks cheap but this year's profit is a cyclical peak (coal, palm oil). For cyclicals, a low P/E is often a sell signal.",
prak:"Use the Valuation calculator in Tools to compute a bank's fair P/B with your chosen ROE, COE and g.",
ref:"Damodaran, Investment Valuation (relative valuation); McKinsey, Value: The Four Cornerstones." },

{ id:"b4", t:"DCF, WACC, and thinking like an analyst", m:16,
inti:"A business is worth the present value of all its future free cash flows. A DCF forces you to be honest about growth, margins and risk.",
body:`
<div class="formula">Firm value = Σ FCFF_t/(1+WACC)^t + TV/(1+WACC)^n
TV (Gordon) = FCFF_(n+1) / (WACC − g)
WACC = E/V × Ke + D/V × Kd × (1 − tax)
Ke (CAPM) = Rf + β × (ERP)</div>
<h3>Indonesian inputs (fill in yourself, update regularly)</h3>
<ul><li><b>Rf</b>: 10-year Indonesian government bond yield.</li>
<li><b>ERP</b>: Indonesia's equity risk premium — Damodaran publishes country premia every January.</li>
<li><b>Corporate tax</b>: 22%.</li>
<li><b>Terminal g</b>: no higher than long-run nominal GDP growth.</li></ul>
<h3>Sensitivity</h3><p>Change WACC ±1% and g ±1% — value can swing 30–50%. That's why analysts present <b>ranges</b>, not single numbers, and demand a <b>margin of safety</b> (Graham).</p>`,
trap:"The terminal value is 70–80% of a DCF. A slightly too-optimistic g makes the valuation explode.",
prak:"Use the simple DCF calculator in Tools, then rebuild it in Excel as in Benninga's book.",
ref:"Koller et al., Valuation; Benninga, Financial Modeling; Rosenbaum & Pearl, Investment Banking." },

{ id:"b5", t:"Earnings quality & accounting red flags", m:12,
inti:"Before trusting reported profit, ask: does it turn into cash, is it recurring, and is it recognised fairly?",
body:`
<h3>12 red flags I check</h3>
<ol><li>CFO far below net profit for years.</li>
<li>Receivables growing much faster than sales (DSO rising).</li>
<li>Inventory piling up (DIO rising) in a business that isn't expanding.</li>
<li>Capitalising costs that should be expenses.</li>
<li>Accounting policy changes / longer useful lives.</li>
<li>Large 'other' income, FX or revaluation gains.</li>
<li>Large related-party transactions (sales to affiliates, affiliate receivables).</li>
<li>Sudden auditor change, a non-clean opinion, or late reports (L notation).</li>
<li>Debt rising while cash is always 'there' — restricted cash?</li>
<li>Large goodwill from buying affiliates.</li>
<li>Dividends paid despite negative FCF.</li>
<li>Management's story keeps changing; targets never met.</li></ol>
<p>Two books in the library (Schilit & O'glove) go much deeper with case studies.</p>`,
trap:"Focusing on a quarter that 'beat consensus' without opening the notes.",
prak:"Pick an IDX issuer that went through a scandal. Find red flags visible 1–2 years earlier in its cash-flow statement.",
ref:"Schilit, Financial Shenanigans; O'glove, Quality of Earnings; CFA L2 FSA (earnings quality)." },

{ id:"b6", t:"Macro for Indonesian stocks", m:12,
inti:"The JCI is heavily influenced by interest rates (BI & the Fed), the rupiah and commodity prices. Foreign investors react to macro first — which shows up in foreign flow.",
body:`
<div class="tablewrap"><table><tr><th>Variable</th><th>If it rises…</th><th>Most sensitive sectors</th></tr>
<tr><td>BI rate</td><td>Funding costs up, valuations down</td><td>Property, banks (NIM may rise but lending slows), leveraged consumer</td></tr>
<tr><td>Fed funds / US10Y</td><td>Yield gap narrows → foreigners leave EMs</td><td>Liquid large caps (BBCA, BBRI, BMRI, TLKM)</td></tr>
<tr><td>USD/IDR (weaker rupiah)</td><td>Importers lose, exporters gain</td><td>Losers: pharma, consumer with imported inputs. Winners: coal, palm oil, exporters</td></tr>
<tr><td>Coal / nickel / palm oil</td><td>Producer profits rise</td><td>ADRO/AADI, PTBA, ITMG, INCO, ANTM, AALI</td></tr>
<tr><td>Inflation</td><td>Purchasing power falls, BI tends to tighten</td><td>Retail (AMRT, ACES), consumer</td></tr></table></div>
<h3>The cycle</h3><p>Expansion → peak → contraction → recovery. Early in recoveries banks and cyclicals tend to lead; late in the cycle defensives (staples, telco) hold up better.</p>`,
trap:"Buying banks 'because higher rates = higher NIM' without checking loan growth and credit costs.",
prak:"Keep a weekly note: BI rate, US10Y, USD/IDR, JCI net foreign. After 3 months, look for patterns. See also the Global Drivers page.",
ref:"Piros & Pinto, Economics for Investment Decision Makers; CFA L1 Economics." },
]},

{ id:"C", t:"Technical Analysis", d:"Knowing WHEN to enter & exit: trend, levels, candlesticks, indicators, trading plan.", lessons:[
{ id:"c1", t:"Trend, market structure, support & resistance", m:10,
inti:"Uptrend = higher highs + higher lows. Downtrend = lower highs + lower lows. Trading with the trend is far easier than guessing turning points.",
body:`
<ul><li><b>Support</b>: an area where demand was strong enough to stop declines — often matches thick bids and accumulation.</li>
<li><b>Resistance</b>: a supply area — many people 'stuck' there waiting to break even (thick offers).</li>
<li><b>Role reversal</b>: broken resistance becomes support.</li>
<li><b>Round numbers</b> (5,000, 1,000, 500) and tick-size changes (25 to 10 below 5,000) often attract big queues.</li></ul>
<p>In your BBCA screenshot: price fell from ~9,000 to ~5,000 — a <b>lower high, lower low</b> structure. The bounce from 5,175 doesn't change the trend until a clear higher high forms.</p>`,
trap:"Assuming every support will hold. Support tested many times actually weakens (bid queues get eaten).",
prak:"Mark HH/HL or LH/LL structure on 3 daily charts. Note where the trend changed.",
ref:"Murphy, Technical Analysis of the Financial Markets; Wyckoff (see Module D)." },
{ id:"c2", t:"Candlesticks + volume = a story", m:10,
inti:"The candle tells you who won the period; volume tells you how serious they were.",
body:`
<div class="tablewrap"><table><tr><th>Pattern</th><th>Meaning</th><th>Needs confirmation</th></tr>
<tr><td>Hammer / lower pin bar</td><td>Sellers pushed down, buyers took it back</td><td>High volume + a green next candle</td></tr>
<tr><td>Shooting star</td><td>Buyers failed to hold the highs</td><td>At resistance + high volume</td></tr>
<tr><td>Engulfing</td><td>Change of control</td><td>Volume above the prior candle</td></tr>
<tr><td>Doji</td><td>Indecision</td><td>Trend context</td></tr>
<tr><td>Marubozu</td><td>One side fully in control</td><td>Trend continuation</td></tr></table></div>
<p>Golden rule: <b>price up + volume up</b> = healthy. <b>Price up + volume down</b> = fading strength. <b>Price down + big volume at support + long lower wick</b> = someone may be absorbing. Details in VSA (Module D).</p>`,
trap:"Reading candles on illiquid stocks. One 1-lot trade can create a 'hammer'.",
prak:"Find 5 candles with 3× the 20-day average volume. What happened 5 days later?",
ref:"Nison, Japanese Candlestick Charting; Coulling, A Complete Guide to Volume Price Analysis." },
{ id:"c3", t:"Indicators: MA, RSI, MACD, Bollinger, Fibonacci", m:12,
inti:"Indicators are derived from price & volume — they lag. Use them for confirmation and discipline, not prophecy. Practise them in the <a href='#/indikator'>Indicator Lab</a>.",
body:`
<ul><li><b>20/50/200-day MA</b>: trend direction. Price above a rising 200-day = long-term uptrend.</li>
<li><b>RSI(14)</b>: momentum. &gt;70 overbought, &lt;30 oversold — in strong trends RSI can stay extreme for long. <b>Divergences</b> are more useful.</li>
<li><b>MACD</b>: EMA12–EMA26; crossing its signal line = momentum change.</li>
<li><b>Bollinger Bands</b>: MA20 ± 2SD. A squeeze often precedes a big move.</li>
<li><b>Fibonacci retracement</b> (as on your BBCA chart: 23.6% · 38.2% · 50% · 61.8% · 78.6%): widely watched pullback areas — so they often become queue areas.</li>
<li><b>Ichimoku Cloud</b>: trend, momentum and support in one system — full guide in the Indicator Lab.</li>
<li><b>Volume MA & OBV</b>: OBV rising while price is flat = possible accumulation.</li></ul>`,
trap:"Stacking 8 indicators all derived from the same price data. More indicators ≠ more accuracy.",
prak:"Pick at most 3: one trend (MA/Ichimoku), one momentum (RSI), one volume (OBV/volume MA). Backtest them in the Indicator Lab.",
ref:"Murphy; Wilder (RSI); Elliott/Patel (Ichimoku); Hilpisch, Python for Finance." },
{ id:"c4", t:"Swing-trading setups & a written trading plan", m:12,
inti:"A trading plan answers before entry: why in, where you're wrong (stop), where to take profit, how many lots. Without it, emotions decide.",
body:`
<h3>Trading plan template</h3>
<div class="formula">Stock     : ____   Date: ____
Thesis    : (short fundamental/technical/flow reason)
Setup     : breakout / pullback to support / Wyckoff spring
Entry     : ____ (why)
Stop loss : ____ (below structure, not a random %)
Target 1/2: ____ / ____    Risk:Reward ≥ 1:2
Size      : 1% risk → ____ lots (use the calculator)
Cancel if : foreign net sell 3 days in a row / accumulating broker turns seller</div>
<h3>3 basic setups</h3>
<ol><li><b>Pullback in an uptrend</b> to the MA20/support on shrinking volume.</li>
<li><b>Breakout</b> of resistance on ≥2× average volume; thick offers eaten by aggressive buys.</li>
<li><b>Spring</b> (Wyckoff): a brief break below support that snaps back on volume — a trap for stop-loss sellers.</li></ol>`,
trap:"Moving your stop further away as price approaches it. That's how a small loss becomes a −30% bag.",
prak:"Write a plan for your next 10 trades, including the ones you don't take. Keep them in a journal.",
ref:"Elder, Trading for a Living; Pompian (behavioural bias)." },
]},

{ id:"D", t:"Bandarmology & Volume Analysis", d:"Reading 'smart money' footprints: Wyckoff, VSA, broker summaries, accumulation & distribution.", lessons:[
{ id:"d1", t:"What bandarmology is (and its limits)", m:9,
inti:"Bandarmology = reading the footprints of large players via volume, broker summaries and the order book. Its global cousins: tape reading, order flow, VSA, Wyckoff.",
body:`
<h3>Who is the "bandar"?</h3>
<p>Not one mysterious person. "Bandar" is shorthand for <b>anyone with enough money to move the price</b>: local fund managers, foreign institutions, controlling shareholders/affiliates, wealthy groups or market makers. They can't buy or sell large amounts at once without leaving traces — <b>that's what we read</b>.</p>
<h3>Why it's readable</h3>
<ul><li>Large money needs <b>time</b> to get in/out (days to months).</li>
<li>They need <b>counterparties</b>: retail sellers when accumulating, retail buyers when distributing.</li>
<li>Traces are recorded: broker concentration, average buy price, lot sizes, unusual volume.</li></ul>
<h3>The limits (important!)</h3>
<ul><li>Since 2021, <b>broker codes and investor types are not shown in real time</b> on the running trade; they're available after each session. IDX & OJK have discussed reopening them (2024–2026) but no decision yet. Intraday you read <b>price, lots, frequency, aggressive buys/sells and queues</b>.</li>
<li>One player can use several brokers, including retail ones, to hide.</li>
<li>A broker summary shows brokers, not their clients.</li>
<li>Bandarmology is most useful for <b>second/third-liners</b>; in large caps (BBCA) players are many and mostly institutional/foreign — there foreign flow matters more.</li></ul>`,
trap:"Following the 'bandar' while ignoring fundamentals. Big players can be wrong too, and retail is the exit liquidity they need when distributing.",
prak:"Start a bandarmology journal: each day note the top 3 buyers & sellers for 3 stocks you follow.",
ref:"Ryan Filbert, Bandarmology; Wyckoff, Studies in Tape Reading." },

{ id:"d2", t:"The Wyckoff cycle: accumulation → markup → distribution → markdown", m:14,
inti:"Wyckoff imagined a 'Composite Man' running the market. He buys quietly when everyone is afraid, lifts the price, then sells to a greedy public.",
body:`
<div class="tablewrap"><table><tr><th>Phase</th><th>Price</th><th>Volume & tape</th><th>Typical broker summary</th></tr>
<tr><td><b>Accumulation</b></td><td>Sideways at the lows, narrow range</td><td>Big volume on declines but price stops falling; small offers eaten slowly</td><td>A few brokers net buy consistently, average price creeps up; sellers spread (retail)</td></tr>
<tr><td><b>Markup</b></td><td>Higher highs, higher lows</td><td>Aggressive buying dominates, thin offers, low-volume pullbacks</td><td>Accumulators occasionally sell (small profit-taking)</td></tr>
<tr><td><b>Distribution</b></td><td>Sideways at the highs, many false breakouts</td><td>Big volume but no further rise (effort without result); thick bids as bait</td><td>Accumulators are now top sellers; buyers spread across retail brokers</td></tr>
<tr><td><b>Markdown</b></td><td>Lower highs, lower lows</td><td>Aggressive selling dominates, bids pulled</td><td>Retail becomes the top buyer ("catching the knife")</td></tr></table></div>
<h3>Key accumulation events</h3>
<ul><li><b>SC (Selling Climax)</b>: panic selling, extreme volume, price bounces.</li>
<li><b>AR (Automatic Rally)</b>: the bounce — sets the top of the range.</li>
<li><b>ST (Secondary Test)</b>: retest of the low on lower volume.</li>
<li><b>Spring</b>: a brief break below the range to trigger stops, then back inside — often the best entry.</li>
<li><b>SOS (Sign of Strength)</b> & <b>LPS (Last Point of Support)</b>: breakout then a pullback that holds.</li></ul>
<p>Distribution mirrors it: BC (buying climax), AR, ST, <b>UTAD (Upthrust After Distribution)</b>, SOW, LPSY.</p>`,
trap:"Calling every sideways range 'accumulation'. A range at the lows after a downtrend can be re-distribution before another drop. You need volume and broker evidence.",
prak:"Find a stock that rose &gt;100% in a year. Go back 6–12 months before the rise and label the Wyckoff phases.",
ref:"Wyckoff, Studies in Tape Reading; Weis, Trades About to Happen; Villahermosa, Wyckoff 2.0." },

{ id:"d3", t:"Volume Spread Analysis (VSA)", m:12,
inti:"Compare <b>effort</b> (volume) with <b>result</b> (spread/high-low range and where it closes). When they don't match, a big player is pushing the other way.",
body:`
<div class="tablewrap"><table><tr><th>Signal</th><th>Candle</th><th>Meaning</th></tr>
<tr><td><span class="up">Stopping volume</span></td><td>Down bar, very high volume, closes mid/high</td><td>Someone absorbing all the selling</td></tr>
<tr><td><span class="up">No supply</span></td><td>Down bar, narrow spread, low volume</td><td>No sellers left — ready to rise</td></tr>
<tr><td><span class="up">Test</span></td><td>Dips into a prior area, low volume, closes high</td><td>Checking whether sellers remain</td></tr>
<tr><td><span class="down">No demand</span></td><td>Up bar, narrow spread, low volume</td><td>A rise without serious buyers</td></tr>
<tr><td><span class="down">Upthrust</span></td><td>Breaks above then closes below, high volume</td><td>A buying trap — distribution</td></tr>
<tr><td><span class="down">Effort, no result</span></td><td>Huge volume, price barely moves up</td><td>A large seller supplying above</td></tr></table></div>
<p>Intraday, VSA shows in the order book: relentless aggressive buying but price doesn't rise = an offer being <b>refilled</b> (big seller). Heavy aggressive selling but price holds = a bid being <b>refilled</b> (big buyer).</p>`,
trap:"Ignoring context: no demand in a strong uptrend means something different from no demand after a long rally.",
prak:"In the Order Book Lab, watch 'aggressive buying vs price change'. That's intraday effort vs result.",
ref:"Tom Williams, Master the Markets; Coulling, A Complete Guide to Volume Price Analysis." },

{ id:"d4", t:"Reading a broker summary", m:14,
inti:"A broker summary totals each broker's buying & selling in one stock over a period (lots, value, average price). Look for <b>concentration</b>, <b>consistency</b> and <b>average price</b>.",
body:`
<h3>Columns</h3>
<ul><li><b>BLot / SLot</b>: lots bought/sold per broker. <b>Net</b> = BLot − SLot.</li>
<li><b>BAvg / SAvg</b>: average prices — the big player's cost. Price below a big buyer's average = they're underwater and likely to defend/lift it.</li>
<li><b>Broker type</b> (colour-coded in many apps): foreign / local / state-owned.</li></ul>
<h3>Derived indicators</h3>
<div class="formula">Top-3 Buyer % = (lots bought by the top 3 brokers) / total lots
Top-3 Seller % = (lots sold by the top 3 brokers) / total lots
Accum/Dist ≈ Top-3 Buyer % − Top-3 Seller %
  &gt; +10%  → buying more concentrated (accumulation)
  &lt; −10%  → selling more concentrated (distribution)</div>
<h3>Classic patterns</h3>
<ul><li><b>Few buyers, many sellers</b> (1–3 brokers absorbing from dozens of retail brokers) → accumulation.</li>
<li><b>Few sellers, many buyers</b> (stock from 1–3 brokers spread to many retail brokers: YP, PD, XC, XL, CC…) → distribution.</li>
<li><b>Same broker on both sides</b> with similar lots → likely internal crossing or market making (wash). Not accumulation.</li>
<li>Periods: check 1 day, 1 week, 1 month. Real accumulation is consistent across periods.</li></ul>`,
trap:"Seeing YP/PD/XC as top buyers and concluding 'retail is buying, so it's distribution'. Big players use retail brokers too. Check average lot per trade and consistency.",
prak:"Practise in the Broker Summary Lab — random scenarios with explanations.",
ref:"Ryan Filbert, Bandarmology; Dormeier, Investing with Volume Analysis." },

{ id:"d5", t:"Big-player playbook & pumped stocks", m:12,
inti:"Learn the patterns so you aren't the victim — not to copy them. Spoofing, wash trading and pump-and-dumps are <b>market manipulation</b>, banned under the Capital Market Law.",
body:`
<div class="tablewrap"><table><tr><th>Pattern</th><th>Signs</th><th>Purpose</th></tr>
<tr><td>Wash trading ("tektok")</td><td>Back-and-forth trades, same lot, same price, high frequency, ownership unchanged</td><td>Make the stock look busy/liquid</td></tr>
<tr><td>Fake bids/offers (spoofing)</td><td>Huge queues that appear and vanish as price approaches</td><td>Create false support/pressure</td></tr>
<tr><td>"Guyur" (dumping)</td><td>Big aggressive sells in a row, bids pulled</td><td>Scare retail into selling cheap (shakeout) — or a real exit</td></tr>
<tr><td>Locking the upper limit</td><td>Offers at the limit eaten, millions of lots bid at the limit</td><td>Attract FOMO for distribution the next day</td></tr>
<tr><td>Split orders</td><td>The same "odd" lot repeated (e.g. 1,234 lots again and again) or rapid 1-lot trades</td><td>Disguised algorithmic accumulation</td></tr>
<tr><td>Shilling ("pom-pom")</td><td>Hype on groups/social media, fantastic price targets</td><td>Find buyers for the big player's stock</td></tr></table></div>
<h3>Red flags for pumped stocks</h3>
<ul><li>Small market cap, small free float, weak fundamentals.</li><li>Up hundreds of percent with no news, then UMA/suspension.</li><li>Broker summary dominated by 1–2 unusual small brokers.</li><li>Volume exploding from near zero.</li></ul>`,
trap:"Believing you can 'get out before the bandar'. When distribution ends, bids vanish and the stock hits the lower limit for days — you can't sell.",
prak:"Study a stock IDX suspended after a sharp rise. Compare its broker summary in the rise vs the fall.",
ref:"Capital Market Law Arts. 90–92 (fraud, manipulation, sham trades); Ryan Filbert." },
]},

{ id:"E", t:"Order Book & Tape Reading", d:"Reading in 1–3 seconds: bid/offer queues, running trade, aggressive buys/sells and the intent behind them.", lessons:[
{ id:"e1", t:"Anatomy of the order book", m:10,
inti:"Left = <b>Bid</b> (buy queue), right = <b>Offer</b> (sell queue). <b>Freq</b> = number of orders, <b>Lot</b> = number of lots. <b>Lot ÷ Freq</b> = average order size → a hint about who is queueing.",
body:`
<p>Just like Stockbit's right panel in your screenshot: <code>Freq | Lot | Bid | Offer | Lot | Freq</code>.</p>
<h3>Example from your BBCA</h3>
<div class="tablewrap"><table><tr><th>Level</th><th>Lots</th><th>Freq</th><th>Lot/Freq</th><th>Reading</th></tr>
<tr><td>Bid 5,250</td><td class="num">103,335</td><td class="num">687</td><td class="num">150</td><td>Thick queue with large average orders → serious buying interest at 5,250</td></tr>
<tr><td>Offer 5,400</td><td class="num">220,133</td><td class="num">2,557</td><td class="num">86</td><td>An offer wall — but many small orders (retail/stuck holders wanting to break even)</td></tr>
<tr><td>Offer 5,350</td><td class="num">159,780</td><td class="num">2,890</td><td class="num">55</td><td>Many nearby sellers — the nearest resistance</td></tr></table></div>
<p>Over 10 levels: bids 551,902 lots vs offers 895,086 lots — offers 1.6× thicker. That is <b>not</b> automatically bearish — in stocks being accumulated, thick offers are often the supply big buyers want to absorb.</p>
<h3>Five numbers I always check</h3>
<ol><li>Best bid–offer spread (1 tick = liquid).</li><li>Total bids vs offers (10 levels).</li><li>Lot/freq per level — big orders or retail?</li><li>The thickest level (the wall).</li><li>How queues change second to second — walls growing, eaten, or pulled?</li></ol>`,
trap:"Assuming a thick bid = it will rise. Queues can be pulled at any time (except in the non-cancellation period). What matters is trades that actually happen.",
prak:"Screenshot the same order book every 10 seconds for 2 minutes. Compare which levels changed and why.",
ref:"Harris, Trading and Exchanges (market microstructure); Wyckoff, Studies in Tape Reading." },

{ id:"e2", t:"Running trade: aggressive buys/sells, big lots, rhythm", m:10,
inti:"The order book is <b>intent</b>; the running trade is <b>action</b>. Read who is aggressive (buys vs sells), trade size, and speed.",
body:`
<ul><li><b>Buy (green)</b> = executed at the offer → the buyer was aggressive.</li>
<li><b>Sell (red)</b> = executed at the bid → the seller was aggressive.</li>
<li><b>Big lots</b> (above the stock's usual size) appearing repeatedly = a large player is active.</li>
<li><b>The same lot repeated</b> (e.g. 500, 500, 500 every few seconds) = an algorithm/iceberg or split order.</li>
<li><b>Rhythm</b>: a sudden jump in frequency → a catalyst/news, or the stock is being played.</li></ul>
<h3>Simple ratio</h3>
<div class="formula">Buy pressure = Aggressive-buy lots / (Aggressive-buy + aggressive-sell lots)
&gt; 60% sustained + price rising          = aggressive demand
&gt; 60% but price NOT rising              = a big seller at the offer (refill)
&lt; 40% but price NOT falling             = a big buyer at the bid (absorption)</div>
<div class="note">In Indonesia, broker codes and investor type (foreign/domestic) have <b>not been shown in real time</b> since 2021. Some apps show extra information depending on the data feed — check what your app really shows. This site's Lab has an "X-ray mode" to train intuition, clearly labelled as simulated data.</div>`,
trap:"Fixating on one big trade. A single 10,000-lot buy may be a crossing or a short cover. Repeated patterns matter.",
prak:"In the Order Book Lab, turn on the stats and guess the scenario before the timer ends.",
ref:"Weis, Trades About to Happen; Wyckoff." },

{ id:"e3", t:"Reading intent: absorption, refills, spoofing, sweeps", m:14,
inti:"Four queue behaviours that most often reveal big players.",
body:`
<div class="tablewrap"><table><tr><th>Behaviour</th><th>What you see</th><th>Likely meaning</th></tr>
<tr><td><b>Absorption</b></td><td>Aggressive sells keep hitting the 5,250 bid, but the 5,250 queue never empties / keeps growing</td><td>A big buyer soaking up supply → accumulation</td></tr>
<tr><td><b>Refill / iceberg at the offer</b></td><td>The 5,400 offer is eaten for 20,000 lots and is thick again seconds later</td><td>A big seller supplying (distribution) or capping price while accumulating below</td></tr>
<tr><td><b>Spoofing / fake bid</b></td><td>A giant bid appears 2–3 ticks below, then vanishes as price approaches</td><td>False support so retail feels safe buying; the spoofer is selling</td></tr>
<tr><td><b>Sweep</b></td><td>Several offer levels cleared within one second by a big aggressive buy</td><td>A buyer who wants stock now — often the start of a markup / news</td></tr>
<tr><td><b>Offers pulled</b></td><td>A thick offer disappears with no trades</td><td>A big seller no longer willing to sell cheap → upside potential</td></tr>
<tr><td><b>Bids pulled</b></td><td>A thick bid disappears with no trades</td><td>Support gone → downside risk</td></tr></table></div>
<p>The key: compare <b>queue changes</b> with <b>actual trades</b>. A queue shrinking because of trades = real. A queue shrinking without trades = pulled.</p>`,
trap:"Spoofing is manipulation. Don't copy it — and don't trust a wall that has never been 'eaten'.",
prak:"In the Lab, the 'Fake bid (spoofing)' and 'Accumulation' scenarios train the difference.",
ref:"Harris, Trading and Exchanges; Cont, Kukanov & Stoikov (2014) on order flow imbalance; Villahermosa, Wyckoff 2.0." },

{ id:"e4", t:"The 3-second checklist", m:8,
inti:"A fast reading order before you click buy/sell. Practise until automatic. Remember: it reads <b>probabilities</b>, never certainty — see Realistic Expectations.",
body:`
<ol>
<li><b>Context (before opening the book)</b>: daily trend, position vs support/resistance, yesterday's foreign flow & broker summary.</li>
<li><b>Second 1 — Running trade</b>: is green or red dominant? Big or small lots? Fast or quiet?</li>
<li><b>Second 2 — Order book</b>: spread, nearest walls on bid & offer, lot/freq of those walls.</li>
<li><b>Second 3 — Effort vs result</b>: lots of buying but price flat? Lots of selling but price holding? Walls eaten or pulled?</li>
<li><b>Decision</b>: does it match your plan? If unsure → no trade. Being flat is a position too.</li></ol>
<div class="tablewrap"><table><tr><th>Combination</th><th>First read</th></tr>
<tr><td>Aggressive buys dominate + offers eaten + price rising + big lots</td><td class="up">Aggressive demand (markup / aggressive accumulation)</td></tr>
<tr><td>Aggressive sells dominate + bid never empties + price holds</td><td class="up">Absorption — passive accumulation</td></tr>
<tr><td>Aggressive buys dominate + offer refilled + price not rising</td><td class="down">Distribution into eager buyers</td></tr>
<tr><td>Aggressive sells dominate + bids pulled + price falling fast</td><td class="down">Markdown / dumping</td></tr>
<tr><td>Many 1–10-lot trades, very high frequency, price rising fast</td><td class="gold">Retail FOMO — prone to reverse</td></tr></table></div>`,
trap:"Deciding in 3 seconds without daily context. The 3 seconds are for execution, not for analysis from scratch.",
prak:"Play 20 rounds of the Order Book Lab. Target ≥70% accuracy.",
ref:"—" },

{ id:"e5", t:"Pre-opening, pre-closing and price limits", m:9,
inti:"Auction phases have their own dynamics: watch IEP & IEV, and remember the non-cancellation period from 08:56 and 15:56.",
body:`
<ul><li><b>IEP spikes in pre-opening</b> then drops sharply before 08:56: large orders were pulled — the earlier queue wasn't honest.</li>
<li><b>Pre-closing</b>: the close sets tomorrow's reference price, fund NAVs and portfolio marks. Institutions often rebalance at the close (especially on MSCI/FTSE rebalancing days) → big pre-closing volume.</li>
<li><b>Upper-limit queues</b>: millions of lots bid at the limit with no offers. Next morning, check whether that queue survives the pre-opening. A queue shrinking fast = fuel running out.</li>
<li><b>Lower limit</b>: offers piled at the limit, no bids. With an asymmetric lower limit (2026), a stock may fall more slowly per day but for many days.</li></ul>`,
trap:"Joining the upper-limit queue in pre-opening — when you get filled, it's often the distribution stock.",
prak:"Watch a stock that hit its upper limit yesterday: note the IEP at 08:50, 08:55, 08:58 and the price at 09:05.",
ref:"IDX rules on pre-opening & pre-closing; non-cancellation FAQ." },
]},

{ id:"F", t:"Foreign Flow", d:"Reading foreign money: what the data means, what drives it, foreign vs local combinations.", lessons:[
{ id:"f1", t:"Foreign data: what it actually measures", m:10,
inti:"<b>F Buy / F Sell</b> = the value traded by investors classified as <b>foreign</b> (from investor data/SID), not by foreign brokers. <b>Net foreign</b> = F Buy − F Sell.",
body:`
<p>In your screenshot (BBCA panel): <code>F Buy 1.15T</code> and <code>F Sell 631.18B</code> → <b>net foreign buy ≈ Rp519 billion</b>. Big for one day, but check first:</p>
<ol><li><b>Regular or negotiated?</b> A block deal can make net foreign jump. Many apps split "RG" and "NG".</li>
<li><b>One day or a trend?</b> Look at 5, 20, 60-day net foreign. Large foreigners build positions over weeks.</li>
<li><b>Share</b>: (F Buy + F Sell) / (2 × total value). In BBCA the foreign share can exceed 40%; in third-liners it's near 0 — net foreign is irrelevant.</li>
<li><b>Foreign average price</b>: if available, compare with today's price.</li></ol>
<h3>Foreign broker ≠ foreign investor</h3>
<p>Foreign investors usually trade through global brokers (AK UBS, BK J.P. Morgan, ZP Maybank, KZ CLSA, etc.), but:</p>
<ul><li>Local investors can use foreign brokers too (e.g. a local pension fund via AK).</li>
<li>Foreign retail investors can use local brokers.</li>
<li>So for "foreign", the <b>F Buy/F Sell</b> data is more accurate than guessing from broker codes.</li></ul>`,
trap:"Net foreign sell = selling everything. Sometimes foreigners sell stock A to buy stock B in the same sector (rotation), or sell because of global fund redemptions, not fundamentals.",
prak:"For BBCA, BBRI, BMRI, TLKM, ASII: log daily net foreign for 20 days alongside price change. Compute the correlation (Global Drivers page).",
ref:"IDX statistics; app data (Stockbit, RTI, IPOT); Richards (2005, JFQA)." },

{ id:"f2", t:"What drives foreign money", m:10,
inti:"Foreigners buy 'Indonesia' as one country in an emerging-market portfolio. Their question: compared with other countries, is Indonesia attractive — after currency risk?",
body:`
<ul><li><b>US rates & the dollar</b>: a tight Fed / strong DXY → money leaves EMs. An easing Fed → inflows.</li>
<li><b>The rupiah</b>: foreigners measure in USD. Stocks up 5% but rupiah down 6% = a loss for them. A stable/stronger rupiah attracts inflows.</li>
<li><b>Index rebalancing</b> (MSCI, FTSE): weight/constituent changes force passive funds to buy/sell on set dates, usually at the <b>pre-close</b>. MSCI announces about 2 weeks ahead.</li>
<li><b>Relative valuation</b>: JCI P/E vs India, Thailand, the Philippines, Vietnam.</li>
<li><b>Policy & governance</b>: regulatory certainty, free-float issues, tax, political stability.</li>
<li><b>Commodities</b>: coal/nickel prices affect miners and the current account (rupiah).</li></ul>
<h3>Foreign favourites</h3><p>Liquid large caps with good governance: BBCA, BBRI, BMRI, BBNI, TLKM, ASII and other MSCI Indonesia constituents. In these, net foreign often moves with the JCI.</p>`,
trap:"Blaming 'foreigners' for every fall. Sometimes locals (mutual funds, insurers, pension funds) are the sellers.",
prak:"Find the last MSCI rebalancing effective date. Check volume & net foreign in stocks added/removed that day.",
ref:"Piros & Pinto, Economics for Investment Decision Makers; MSCI Index Review announcements." },

{ id:"f3", t:"The price × foreign × local broker matrix", m:10,
inti:"Combine three data points: price direction, net foreign, and who is on the other side. The result is 6–8 stories you can memorise.",
body:`<p>See the full matrix and its interactive quiz on the <a href="#/asing">Foreign vs Local Matrix</a> page.</p>
<div class="tablewrap"><table><tr><th>Price</th><th>Net foreign</th><th>Main reading</th></tr>
<tr><td class="up">Up</td><td class="up">Net buy</td><td>Foreigners leading — the healthiest trend in large caps</td></tr>
<tr><td class="up">Up</td><td class="down">Net sell</td><td>Locals lifting; foreigners use the rally to exit. Careful in large caps</td></tr>
<tr><td class="down">Down</td><td class="up">Net buy</td><td>Foreigners accumulating while cheap — often precedes a reversal</td></tr>
<tr><td class="down">Down</td><td class="down">Net sell</td><td>Foreign pressure — wait for selling to ease</td></tr>
<tr><td>Flat</td><td class="up">Big net buy</td><td>Someone (local distribution) supplying above, or foreigners absorbing slowly</td></tr></table></div>`,
trap:"Using this matrix on stocks with little foreign ownership. It doesn't apply.",
prak:"Do the case quiz on the Foreign vs Local Matrix page.",
ref:"—" },
]},

{ id:"G", t:"Risk, Psychology & Law", d:"What separates traders who last 10 years from those who don't.", lessons:[
{ id:"g1", t:"Position sizing & stop losses", m:10,
inti:"You can't control price, but you can control <b>your maximum loss</b> per trade. Risking 1% per trade means 100 consecutive mistakes to wipe out.",
body:`
<div class="formula">Lots = (Capital × Risk%) ÷ ((Entry − Stop) × 100)</div>
<p>Capital Rp100M, 1% risk = Rp1M. Entry 5,325, stop 5,175 (150 apart). Lots = 1,000,000 ÷ (150 × 100) = <b>66 lots</b>.</p>
<h3>The maths of losses</h3>
<div class="tablewrap"><table><tr><th>Loss</th><th>Gain needed to break even</th></tr>
<tr><td>-10%</td><td>+11%</td></tr><tr><td>-20%</td><td>+25%</td></tr><tr><td>-30%</td><td>+43%</td></tr><tr><td>-50%</td><td>+100%</td></tr></table></div>
<p>A −29% position needs +41% just to get back. The right question isn't "when will it come back" but: <b>if I had this much cash today, would I buy this stock?</b></p>
<h3>Expectancy</h3>
<div class="formula">E = (Win% × Avg win) − (Loss% × Avg loss)</div>
<p>A 40% win rate is still profitable if the average win is 2.5× the average loss.</p>`,
trap:"Averaging down without a plan. Only average down if the fundamental thesis is intact and it was planned from the start, not out of hope.",
prak:"Use the Position Size and Expectancy calculators in Tools on your last 10 trades.",
ref:"Van Tharp, Trade Your Way to Financial Freedom; Pompian." },
{ id:"g2", t:"Behavioural biases & the trading journal", m:10,
inti:"Markets exploit our biases. Big players need retail to FOMO during distribution and panic during accumulation.",
body:`
<div class="tablewrap"><table><tr><th>Bias</th><th>How it shows in stocks</th><th>Antidote</th></tr>
<tr><td>Loss aversion / disposition effect</td><td>Selling winners fast, holding losers</td><td>A written stop before entry</td></tr>
<tr><td>Overconfidence</td><td>Position size grows after a few wins</td><td>A fixed sizing rule (1%)</td></tr>
<tr><td>Anchoring</td><td>"It used to be 9,000, at 5,000 it must be cheap"</td><td>Value on fundamentals, not past prices</td></tr>
<tr><td>Herding / FOMO</td><td>Following Telegram groups, buying at the upper limit</td><td>Checklist: who is selling to me?</td></tr>
<tr><td>Confirmation bias</td><td>Only reading news that supports your position</td><td>Write 3 ways your thesis could be wrong</td></tr>
<tr><td>Sunk cost</td><td>"I've lost so much, might as well hold"</td><td>The cash question in g1</td></tr></table></div>
<h3>What to journal</h3><p>Date, stock, setup, reason, entry/stop/target, size, result, <b>emotions at entry & exit</b>, lesson. Review monthly: which setups actually make money?</p>`,
trap:"Only journaling winning trades.",
prak:"Start a spreadsheet journal today. Your first 30 trades are data, not a verdict.",
ref:"Pompian, Behavioral Finance and Wealth Management; Kahneman, Thinking, Fast and Slow; CFA L3 Behavioral Finance." },
{ id:"g3", t:"Manipulation, the law, and protecting yourself", m:8,
inti:"The Capital Market Law bans fraud, market manipulation, sham trades and insider trading. Knowing the patterns keeps you from becoming a victim — or an unwitting participant.",
body:`
<ul><li><b>Article 90</b>: fraud and misleading statements in securities trading.</li>
<li><b>Article 91</b>: creating a false impression of trading activity or prices.</li>
<li><b>Article 92</b>: a series of trades that fixes, raises or lowers prices to influence others.</li>
<li><b>Articles 95–98</b>: insider trading.</li></ul>
<p>Shilling stocks in paid groups while holding undisclosed positions also carries legal risk. Report suspected violations to OJK (contact 157).</p>
<h3>Protect yourself</h3><ul><li>Avoid stocks with repeated UMA notices & special notations unless you understand the risks.</li><li>Never hand over your account/PIN.</li><li>Beware "bandar classes" promising guaranteed profits.</li></ul>`,
trap:"Thinking manipulation is 'only for big players'. Small groups buying together to lift a stock can also qualify.",
prak:"Read one OJK sanction related to stock manipulation and match its pattern with the table in d5.",
ref:"Law No. 8/1995 on the Capital Market as amended by Law 4/2023 (P2SK)." },
]},
];

window.GLOSSARY_EN = {
 "ARA":"Upper auto-rejection limit — the maximum daily price rise.","ARB":"Lower auto-rejection limit — the maximum daily fall. Asymmetric 7% from 19 Oct 2026 (temporary).",
 "Bid":"Buy queue; the highest price buyers will pay.","Offer / Ask":"Sell queue; the lowest price sellers will accept.",
 "HAKA":"'Hit right' — buying immediately at the offer.","HAKI":"'Hit left' — selling immediately into the bid.",
 "Lot":"100 shares.","Fraksi":"Tick size — the minimum price increment.","Freq":"Number of orders/trades.",
 "Running trade":"Real-time list of executed trades.","Broker summary":"Each broker's buying/selling in one stock.",
 "Net foreign":"F Buy − F Sell; trades by investors classified as foreign.","Nego / NG":"Negotiated market; block trades outside the order book.",
 "Crossing":"The same broker on both the buy and sell side.","Tektok":"Back-and-forth wash trades to fake activity.",
 "Spoofing":"Placing large orders with no intent to execute, to mislead the market.","Iceberg":"A large order shown only in part and continually refilled.",
 "Absorption":"Selling soaked up by a large bid without the price falling.","Akumulasi":"Accumulation — big players quietly collecting shares.",
 "Distribusi":"Distribution — big players offloading shares to the public.","Markup":"The rising phase after accumulation.","Markdown":"The falling phase after distribution.",
 "Spring":"(Wyckoff) A brief break below support to trigger stops, then a recovery.","UTAD":"(Wyckoff) Upthrust After Distribution — a false breakout above the range.",
 "VSA":"Volume Spread Analysis — comparing volume with candle range.","IEP":"Indicative Equilibrium Price in the opening/closing auction.",
 "UMA":"Unusual Market Activity — IDX warning about abnormal moves.","FCA":"Full Call Auction — trading mechanism for the special monitoring board.",
 "Cum date":"Last day to buy and still receive an entitlement (dividend/rights).","Ex date":"First day the price trades without the entitlement.",
 "HMETD":"Pre-emptive rights (rights issue).","Free float":"Shares not held by controlling shareholders.",
 "SID":"Single Investor Identification issued by KSEI.","RDN":"Investor cash account at a bank.","T+2":"Settlement two trading days after the trade.",
 "NIM":"Bank net interest margin.","CASA":"Share of current + savings accounts in deposits.","NPL":"Non-performing loans.",
 "PBV":"Price to book value.","PER":"Price to earnings ratio.","WACC":"Weighted average cost of capital.","DCF":"Discounted cash flow.",
 "YTM":"Bond yield to maturity.","Duration":"A bond price's sensitivity to yield changes.","LPS":"Indonesia Deposit Insurance Corporation; guarantees deposits up to Rp2 billion per depositor per bank if the rate is at or below its guaranteed rate.",
 "MSCI rebalancing":"Changes to MSCI index constituents/weights that trigger passive-fund trading.","Composite Man":"Wyckoff's idea of imagining the market run by one large operator.",
};
