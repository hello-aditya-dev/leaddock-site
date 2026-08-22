/**
 * LeadDock site generator — builds static HTML pages from shared layout.
 * Run: node build.js   → writes .html, robots.txt, sitemap.xml, favicon.svg
 * Deploy: commit output; Vercel serves this directory as static files.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://leaddock-site.vercel.app";
const YEAR = 2026;

const NAV = [
  ["/features", "Features"],
  ["/pricing", "Pricing"],
  ["/demo", "Demo"],
  ["/for-agencies", "For Agencies"],
  ["/docs", "Docs"],
];

function head(title, desc, canonicalPath) {
  const url = SITE + canonicalPath;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="LeadDock">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f766e">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
`;
}

function header(active) {
  const links = NAV.map(
    ([href, label]) =>
      `<li><a href="${href}"${active === href ? ' aria-current="page"' : ""}>${label}</a></li>`
  ).join("\n      ");
  return `<header class="site-header">
  <div class="container nav">
    <a class="brand" href="/"><span class="brand-mark">LD</span>LeadDock</a>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>
    <ul class="nav-links" id="nav-links">
      ${links}
      <li class="nav-cta"><a class="btn btn-primary" href="/pricing">Get LeadDock — $59</a></li>
    </ul>
  </div>
</header>

<main id="main">
`;
}

function footer() {
  return `</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/"><span class="brand-mark">LD</span>LeadDock</a>
        <p style="margin-top:14px; max-width:30em;">The lightweight CRM layer for WhatsApp Web. Capture the lead, add context, follow up, close the deal.</p>
      </div>
      <div><h4>Product</h4><ul>
        <li><a href="/features">Features</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/demo">Demo</a></li>
        <li><a href="/faq">FAQ</a></li>
      </ul></div>
      <div><h4>Solutions</h4><ul>
        <li><a href="/whatsapp-crm">WhatsApp CRM</a></li>
        <li><a href="/whatsapp-lead-tracker">Lead tracker</a></li>
        <li><a href="/whatsapp-quick-replies">Quick replies</a></li>
        <li><a href="/for-agencies">For agencies</a></li>
      </ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="/docs">Docs</a></li>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/license">License</a></li>
        <li><a href="mailto:witejackel@gmail.com">Support</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© ${YEAR} LeadDock. All rights reserved.</span>
      <span>LeadDock is an independent productivity extension for WhatsApp Web. Not affiliated with or endorsed by WhatsApp or Meta.</span>
    </div>
  </div>
</footer>
<script src="/site.js" defer></script>
</body>
</html>
`;
}

function pageHero(title, lede, crumbs = [["/", "Home"]]) {
  const bc =
    crumbs
      .map(([href, label], i) =>
        i === crumbs.length - 1
          ? `<span aria-current="page">${label}</span>`
          : `<a href="${href}">${label}</a> &rsaquo; `
      )
      .join("");
  return `<section class="page-hero">
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">${bc}</nav>
    <h1>${title}</h1>
    <p class="lede">${lede}</p>
  </div>
</section>
`;
}

const ctaBand = (title, sub, primaryLabel = "Get LeadDock — $59") => `<section class="section">
  <div class="container">
    <div class="cta-band">
      <h2>${title}</h2>
      <p>${sub}</p>
      <div class="btn-row" style="justify-content:center;">
        <a class="btn btn-primary btn-lg" href="/pricing">${primaryLabel}</a>
        <a class="btn btn-secondary btn-lg" href="/demo">Watch the demo</a>
      </div>
    </div>
  </div>
</section>
`;

// ---------- page bodies ----------

const featuresBody =
  pageHero("Features", "Everything you need to manage WhatsApp leads — and nothing you don't.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:24px;">
  <div class="container">
    <div class="grid grid-3">
      <div class="card"><div class="card-icon">🏷️</div><h3>7 editable lead statuses</h3><p>New Lead, Contacted, Interested, Follow Up, Qualified, Won, Lost — rename them, recolor them, add your own. Your pipeline, your words.</p></div>
      <div class="card"><div class="card-icon">#️⃣</div><h3>Custom tags</h3><p>Color-coded labels like Hot, High Value or Wholesale. Invent as many as you need and stack multiple tags per contact.</p></div>
      <div class="card"><div class="card-icon">📝</div><h3>Timestamped notes</h3><p>Add, edit and delete notes on any contact. Newest first, so the latest context is always on top.</p></div>
      <div class="card"><div class="card-icon">⚡</div><h3>Quick replies</h3><p>Save pricing lines, catalogues and greetings once. Insert them into any chat in one click from the ⚡ Replies launcher.</p></div>
      <div class="card"><div class="card-icon">⌨️</div><h3>Slash shortcuts</h3><p>Type <span class="kbd">/price</span> or <span class="kbd">/hi</span> directly in the composer. LeadDock detects the shortcut and offers the saved reply.</p></div>
      <div class="card"><div class="card-icon">🔤</div><h3>Template variables</h3><p><span class="kbd">{{name}}</span> <span class="kbd">{{phone}}</span> <span class="kbd">{{company}}</span> <span class="kbd">{{product}}</span> fill in automatically. Unknown variables stay visible — never silently blank.</p></div>
      <div class="card"><div class="card-icon">📅</div><h3>Follow-up presets</h3><p>Today, Tomorrow, In 3 days, Next week, or a custom date. Due, overdue and upcoming states at a glance.</p></div>
      <div class="card"><div class="card-icon">📊</div><h3>Today dashboard</h3><p>Total leads, open leads, due today, overdue, won — actionable counts, not vanity charts.</p></div>
      <div class="card"><div class="card-icon">🔎</div><h3>Search everywhere</h3><p>Name, phone, company, notes, tags — plus filters by status, tag and follow-up due date.</p></div>
      <div class="card"><div class="card-icon">🎛️</div><h3>Command palette</h3><p>Press <span class="kbd">Ctrl/Cmd+K</span>: search contacts, change status, insert a reply, export data, toggle privacy mode.</p></div>
      <div class="card"><div class="card-icon">📤</div><h3>CSV import &amp; export</h3><p>Bring your spreadsheet in with validated import and preview, or take your data out any time.</p></div>
      <div class="card"><div class="card-icon">💾</div><h3>JSON backup &amp; restore</h3><p>Versioned schema, validation before restore, and a preview step so nothing corrupts silently.</p></div>
      <div class="card"><div class="card-icon">🙈</div><h3>Privacy mode</h3><p>One click blurs sensitive CRM details for screen shares, demos and office environments.</p></div>
      <div class="card"><div class="card-icon">🧪</div><h3>Demo mode</h3><p>Fictional sample data ships built-in, with a one-click reset — perfect for evaluating before real use.</p></div>
      <div class="card"><div class="card-icon">🩺</div><h3>Diagnostics screen</h3><p>A health check of every integration point. If WhatsApp Web changes its layout, diagnostics tell us exactly where.</p></div>
      <div class="card"><div class="card-icon">🧩</div><h3>White-label config</h3><p>Every buyer-facing string, color and logo lives in one config file. Rebrand without touching feature code.</p></div>
      <div class="card"><div class="card-icon">🕘</div><h3>Activity timeline</h3><p>Status changes, notes and tag additions are logged per contact — lightweight history, zero clutter.</p></div>
      <div class="card"><div class="card-icon">🔒</div><h3>Minimal permissions</h3><p>Only <code style="font-size:.85em;">storage</code> plus access to web.whatsapp.com. No all-URLs access, no tabs, no cookies.</p></div>
    </div>
  </div>
</section>
` + ctaBand("All of it, in one panel.", "One-time payment. No subscription.");

const pricingBody =
  pageHero("Simple pricing. Pay once, own it.", "No monthly fees. No seats to count. Two licenses cover everything from internal use to client work.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container">
    <div class="pricing-grid">
      <div class="price-card featured">
        <span class="pop-badge">Most popular</span>
        <h3>Commercial</h3>
        <div class="price">$59 <small>one-time</small></div>
        <p class="price-note">For one organization using LeadDock internally.</p>
        <ul>
          <li>Full source code included</li>
          <li>Rebrand via one config file (name, colors, logo)</li>
          <li>Edit statuses, tags, quick replies &amp; fields</li>
          <li>Ship one branded end product inside your org</li>
          <li>Install on your team's browsers (~25 seats)</li>
          <li>All v1.x updates included</li>
          <li>Email support</li>
        </ul>
        <a class="btn btn-primary btn-lg" href="mailto:witejackel@gmail.com?subject=Order%20LeadDock%20Commercial%20(%2459)" rel="nofollow">Buy Commercial — $59</a>
      </div>
      <div class="price-card">
        <h3>Agency</h3>
        <div class="price">$99 <small>one-time</small></div>
        <p class="price-note">For agencies delivering branded builds to clients.</p>
        <ul>
          <li>Everything in Commercial</li>
          <li>Up to 5 distinct client deployments</li>
          <li>Clients receive the installable binary only</li>
          <li>Charge clients for setup, branding &amp; support</li>
          <li>All v1.x updates included</li>
          <li>Email support</li>
        </ul>
        <a class="btn btn-secondary btn-lg" href="mailto:witejackel@gmail.com?subject=Order%20LeadDock%20Agency%20(%2499)" rel="nofollow">Buy Agency — $99</a>
      </div>
    </div>
    <p style="text-align:center; margin-top:22px; font-size:.92rem; color:var(--muted);">14-day refund window if the source hasn't been downloaded. <a href="/license">Full license terms →</a></p>
    <p class="order-note">Click a buy button to order by email — your download links and license are sent the same day.</p>
  </div>
</section>

<section class="section section--soft">
  <div class="container prose">
    <h2 style="margin-top:0;">What each license can do</h2>
    <table>
      <tr><th>Right</th><th>Commercial $59</th><th>Agency $99</th></tr>
      <tr><td>Use LeadDock commercially</td><td>✓ Internal use</td><td>✓ Internal + client work</td></tr>
      <tr><td>Modify source code</td><td>✓</td><td>✓</td></tr>
      <tr><td>Rebrand (name, logo, colors)</td><td>✓ One brand</td><td>✓ Per client brand</td></tr>
      <tr><td>Branded end products</td><td>1 (internal only)</td><td>Up to 5 client organizations</td></tr>
      <tr><td>Clients receive</td><td>—</td><td>Installable binary only</td></tr>
      <tr><td>Resell the source code</td><td>✗</td><td>✗</td></tr>
    </table>
    <div class="notice"><strong>Independence notice.</strong> LeadDock is an independent productivity extension for WhatsApp Web. It is not affiliated with or endorsed by WhatsApp or Meta.</div>
  </div>
</section>
`;

const demoBody =
  pageHero("See LeadDock in 60 seconds", "A full walkthrough using fictional demo data — statuses, notes, slash shortcuts, follow-ups and the Today dashboard.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container">
    <div class="mockup" role="img" aria-label="LeadDock quick reply flow mockup" style="max-width:720px;margin:0 auto;">
      <div class="mockup-bar"><span class="mockup-dot"></span><span class="mockup-dot"></span><span class="mockup-dot"></span></div>
      <div class="mockup-body">
        <div class="mock-chat">
          <div class="bubble bubble-in">Can you share the price list?</div>
          <div class="bubble bubble-out">Hi Neha, sure — sending our wholesale catalogue now. 🙌<span class="bubble-time">via /catalogue · LeadDock</span></div>
          <div class="bubble bubble-in">Perfect, thanks!</div>
          <div class="mock-composer">Message…&nbsp;&nbsp;&nbsp;⚡ Replies&nbsp;&nbsp;<span class="kbd">/</span>&nbsp;<span class="kbd">Ctrl+K</span></div>
        </div>
        <aside class="mock-panel">
          <div class="mock-panel-title"><span>Neha Patel</span><span class="ld-badge">LEADDOCK</span></div>
          <div class="chip-row"><span class="chip chip-status">Interested</span><span class="chip chip-hot">Hot</span></div>
          <div class="note-card"><div class="note-meta">Note · today</div>Wants catalogue + bulk discount for 200 units.</div>
          <div class="fu-row"><span>Send quote</span><span class="fu-due">Overdue</span></div>
          <div class="fu-row" style="border-color:#86efac;background:#f0fdf4;"><span>Check stock</span><span style="color:#15803d;font-weight:700;">Tomorrow</span></div>
        </aside>
      </div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head"><h2>What the demo shows</h2><p>The full video follows this exact sequence — every action performed live on demo data.</p></div>
    <div class="prose">
      <table>
        <tr><th style="width:90px;">Time</th><th>Action</th></tr>
        <tr><td>0–5s</td><td>WhatsApp Web inbox with an active enquiry</td></tr>
        <tr><td>5–12s</td><td>LeadDock panel docks beside the chat</td></tr>
        <tr><td>12–20s</td><td>Set status to “Follow Up”</td></tr>
        <tr><td>20–28s</td><td>Add a timestamped note</td></tr>
        <tr><td>28–37s</td><td>Type <code>/price</code> in the composer</td></tr>
        <tr><td>37–45s</td><td>Insert the saved reply with variables filled</td></tr>
        <tr><td>45–52s</td><td>Set a follow-up for tomorrow</td></tr>
        <tr><td>52–60s</td><td>Open the Today dashboard — follow-ups listed</td></tr>
      </table>
    </div>
  </div>
</section>
` + ctaBand("Try it yourself in two minutes.", "Demo data included — reset any time.");

const faqData = [
  ["Is LeadDock affiliated with WhatsApp or Meta?", "No. LeadDock is an independent productivity extension. It is not affiliated with, endorsed by, or approved by WhatsApp or Meta."],
  ["Does LeadDock auto-send messages?", "No. LeadDock inserts text into the WhatsApp composer. You always review and press send yourself. There is no bulk messaging, no scheduled sending and no automation of outreach."],
  ["Does LeadDock read my messages?", "No. It reads only the current chat header to identify which contact you are talking to, and interacts with the composer box to insert reply text. Message history is never scraped."],
  ["Where is my CRM data stored?", "Entirely on your own machine, in chrome.storage.local inside your browser. There is no server, no account and no sync. You can export CSV or JSON backups at any time."],
  ["What permissions does the extension need?", "Only the storage permission and access to web.whatsapp.com. It requests no broad web access, no tabs permission and no cookies."],
  ["Which browsers are supported?", "Any Chromium browser that supports Manifest V3 extensions: Chrome, Edge, Brave, Opera and others."],
  ["Is LeadDock a subscription?", "No. Both licenses are one-time payments with perpetual rights under their tier, including minor updates within v1.x."],
  ["What's the difference between Commercial and Agency?", "Commercial ($59): rebrand and ship one branded end product used inside your own organization. Agency ($99): deliver up to five branded builds to distinct client organizations — clients receive the installable binary only."],
  ["Can I resell the source code?", "No. Neither tier grants source-resale rights. For custom or OEM arrangements, contact support."],
  ["How do updates work?", "Minor updates within the same major version (1.x) are included. Major upgrades may be offered at a discount to existing buyers."],
  ["What happens if WhatsApp Web changes its layout?", "LeadDock uses a centralized adapter with selector fallbacks, plus a built-in diagnostics screen. If something breaks, support can usually ship a fix in one place quickly."],
  ["Can I get a refund?", "Yes — within 14 days of purchase if you haven't downloaded the source kit. Email witejackel@gmail.com with your order reference."],
];
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});
const faqBody =
  pageHero("Frequently asked questions", "Straight answers about how LeadDock works, what it reads, what it stores and what it never does.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:10px;">
  <div class="container faq prose">
    ${faqData.map(([q, a]) => `<details${q === faqData[0][0] ? "" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("\n    ")}
  </div>
</section>
` + ctaBand("Still have questions?", "Email witejackel@gmail.com — real human support.");

const docsBody =
  pageHero("Documentation", "Install, explore with demo data, make it yours, and get help when you need it.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container prose">
    <h2 style="margin-top:0;">Quickstart</h2>
    <ol>
      <li><strong>Unzip</strong> your LeadDock download.</li>
      <li>Open Chrome and go to <code>chrome://extensions</code>.</li>
      <li>Enable <strong>Developer mode</strong> (top right).</li>
      <li>Click <strong>Load unpacked</strong> and select the unzipped folder.</li>
      <li>Open <strong>web.whatsapp.com</strong>. The LeadDock panel appears beside any chat.</li>
    </ol>
    <h2>Explore with demo data</h2>
    <p>On first load LeadDock seeds fictional demo contacts so you can click through statuses, notes, quick replies and follow-ups immediately. Reset any time from Options → Reset Demo Data.</p>
    <h2>Make it yours</h2>
    <ul>
      <li>Edit <code>src/config/brand.js</code> — name, colors, support email, links.</li>
      <li>Replace the icons in <code>assets/icons/</code>.</li>
      <li>Run <code>npm install &amp;&amp; npm run build</code> to produce a fresh <code>dist/</code>.</li>
    </ul>
    <h2>Troubleshooting</h2>
    <ul>
      <li><strong>Panel not appearing?</strong> Refresh the WhatsApp Web tab after loading the extension.</li>
      <li><strong>Contact not detected?</strong> Open the Diagnostics modal from the panel menu and include its output when emailing support.</li>
      <li><strong>Data question?</strong> Everything lives locally — use Options → Export Backup before major changes.</li>
    </ul>
    <div class="notice"><strong>Support:</strong> witejackel@gmail.com — include your order reference and, for technical issues, the diagnostics output.</div>
  </div>
</section>
`;

const privacyBody =
  pageHero("Privacy policy", "Local-first means local-first. Here is exactly what LeadDock reads, stores and transmits.", [["/", "Home"], ["/privacy", "Privacy"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container prose">
    <p><em>Effective date: January 1, 2026.</em></p>
    <div class="notice" style="margin-bottom:28px;"><strong>Independence notice.</strong> LeadDock is an independent productivity extension for WhatsApp Web. It is not affiliated with or endorsed by WhatsApp or Meta.</div>

    <h2 style="margin-top:0;">The short version</h2>
    <p>Your CRM records — contacts, notes, tags, statuses, follow-ups and quick replies — are stored <strong>locally in your browser</strong> using chrome.storage.local. LeadDock has no backend server, no database, no telemetry and no analytics. Nothing about your CRM data leaves your machine.</p>

    <h2>What LeadDock reads</h2>
    <ul>
      <li>The <strong>current chat header</strong> on web.whatsapp.com, to identify which contact you're viewing.</li>
      <li>The <strong>composer element</strong>, so it can insert reply text when you choose a quick reply.</li>
    </ul>
    <p>LeadDock does not read message history, does not scrape conversations, and does not monitor anything outside web.whatsapp.com.</p>

    <h2>What LeadDock stores</h2>
    <p>Contact details you capture (name, phone, company, email, product, budget, source), your notes, tags, statuses, follow-up dates, quick-reply templates and preferences. All of it stays in local browser storage on your device.</p>

    <h2>What LeadDock transmits</h2>
    <p>Nothing. There is no remote endpoint to transmit to. The extension works entirely offline after installation.</p>

    <h2>Permissions requested</h2>
    <p><code>storage</code> — required to save your CRM data locally.<br>
    <code>https://web.whatsapp.com/*</code> — required to show the CRM panel and detect the active contact.</p>

    <h2>Backing up and deleting your data</h2>
    <p>Export a full JSON backup or CSV file from the extension options at any time. Use "Reset all CRM data" to erase everything stored locally.</p>

    <h2>Changes</h2>
    <p>If this policy changes, the updated version will be published here with a new effective date.</p>

    <h2>Contact</h2>
    <p>Questions about privacy: <a href="mailto:witejackel@gmail.com">witejackel@gmail.com</a></p>
  </div>
</section>
`;

const licenseBody =
  pageHero("License terms", "Two tiers, plain language. The authoritative text ships in every kit as LICENSE.md.", [["/", "Home"], ["/license", "License"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container prose">
    <div class="notice" style="margin-bottom:28px;"><strong>Starting template.</strong> The license text is a practical starting point, not legal advice. Review with a qualified lawyer before commercial distribution.</div>
    <table>
      <tr><th>Right</th><th>Commercial — $59</th><th>Agency — $99</th></tr>
      <tr><td>Internal commercial use</td><td>✓</td><td>✓</td></tr>
      <tr><td>Modify the source code</td><td>✓</td><td>✓</td></tr>
      <tr><td>Rebrand (name, logo, colors)</td><td>✓ One brand</td><td>✓ One per client</td></tr>
      <tr><td>Branded end products</td><td>One, internal only</td><td>Up to 5 client organizations</td></tr>
      <tr><td>Client delivery format</td><td>—</td><td>Binary only (no source to clients)</td></tr>
      <tr><td>Sell as your own product / kit</td><td>✗</td><td>✗</td></tr>
      <tr><td>Resell or redistribute source</td><td>✗</td><td>✗</td></tr>
      <tr><td>Updates within v1.x</td><td>✓ Included</td><td>✓ Included</td></tr>
    </table>
    <h2>The essentials</h2>
    <ul>
      <li><strong>Licensed, not sold.</strong> Rights come from the tier you purchased; everything not granted is reserved.</li>
      <li><strong>No source resale in any tier.</strong> Rebrand and deploy per your tier — but LeadDock may not become someone else's developer kit.</li>
      <li><strong>Independence notice must travel</strong> with every copy: LeadDock is not affiliated with or endorsed by WhatsApp or Meta.</li>
      <li><strong>No spam use.</strong> Using the software for bulk unsolicited outreach or message-history scraping violates the license.</li>
      <li><strong>Upgrades:</strong> pay the difference (e.g., Commercial → Agency: $40). Downgrades aren't offered.</li>
    </ul>
    <p>Full terms ship in every kit as <code>LICENSE.md</code>. Questions: <a href="mailto:witejackel@gmail.com">witejackel@gmail.com</a></p>
  </div>
</section>
`;

// ---- intent landing pages ----

const intentPage = (opts) =>
  pageHero(opts.h1, opts.lede, [["/", "Home"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container" style="max-width:800px;">
    ${opts.body}
    <div class="notice" style="margin-top:34px;"><strong>Independence notice.</strong> LeadDock is an independent productivity extension for WhatsApp Web. It is not affiliated with or endorsed by WhatsApp or Meta.</div>
  </div>
</section>
` + ctaBand(opts.ctaTitle || "Turn WhatsApp Web into your sales workspace.", "One-time payment. Full source included.");

const whatsappCrmBody = intentPage({
  h1: "A WhatsApp CRM that lives where you already sell",
  lede: "LeadDock adds lead tracking, notes, tags and follow-ups directly onto WhatsApp Web — no second app, no import/export loop.",
  body: `
<h2>The problem with "proper" CRMs</h2>
<p>Traditional CRMs ask your team to stop living in WhatsApp and start logging calls somewhere else. Nobody does. Leads arrive as chats, context lives in the thread, and the CRM record goes stale the moment it's created.</p>
<p>LeadDock flips the model: instead of pulling people out of WhatsApp, it puts a lightweight CRM layer <em>inside</em> WhatsApp Web. When you open a chat, the LeadDock panel opens beside it showing that contact's status, tags, notes, deal details and next follow-up.</p>
<h2>What you get</h2>
<ul>
<li><strong>Contact detection</strong> — open a chat and the right record appears, automatically.</li>
<li><strong>Pipeline statuses</strong> — New Lead through Won/Lost, editable to match how you actually sell.</li>
<li><strong>Notes that stick</strong> — "wants 100 units, needs quote Tuesday" attached to the person, forever.</li>
<li><strong>Quick replies</strong> — answer common questions in two clicks without retyping.</li>
<li><strong>Follow-ups</strong> — a daily list of who needs chasing, right in your inbox.</li>
<li><strong>CSV/JSON in and out</strong> — your spreadsheet can come along; your data can always leave.</li>
</ul>
<h2>Who it's for</h2>
<p>Small businesses, freelancers and sales teams whose leads genuinely arrive on WhatsApp — retailers, wholesalers, service providers, agents and consultants. If your customers message you first, LeadDock is the missing layer between "chat" and "closed deal".`,
});

const whatsappWebCrmBody = intentPage({
  h1: "CRM for WhatsApp Web, installed in minutes",
  lede: "A Manifest V3 Chrome extension that turns web.whatsapp.com into a proper sales workspace — local-first, no backend, no subscription.",
  body: `
<h2>Built for WhatsApp Web specifically</h2>
<p>LeadDock isn't a generic CRM with a WhatsApp gimmick bolted on. It's designed around the way WhatsApp Web actually works: one conversation in focus, a composer waiting for input, a sidebar full of people who need answers.</p>
<p>The extension docks a CRM panel beside any chat. It detects the contact you're viewing, resolves or creates their record, and keeps your pipeline one glance away — all while respecting WhatsApp's interface.</p>
<h2>Engineering you can trust (and inspect)</h2>
<ul>
<li><strong>Manifest V3</strong>, the current Chrome standard — future-proof installs.</li>
<li><strong>Local-first storage</strong> via chrome.storage.local. No servers involved.</li>
<li><strong>Minimal permissions</strong>: storage + web.whatsapp.com only.</li>
<li><strong>You always press send</strong>. LeadDock inserts text; humans send messages.</li>
<li><strong>Diagnostics built in</strong> — a health screen pinpoints any issue fast.</li>
</ul>
<h2>Why buyers choose the kit</h2>
<p>Both licenses include the complete source. Rebrand it for your business from a single config file, customize statuses and replies, and build your own installer with the included tooling.`,
});

const leadTrackerBody = intentPage({
  h1: "Track every WhatsApp lead without leaving the chat",
  lede: "Statuses, timestamps and a daily follow-up queue turn scattered enquiries into a pipeline you can actually see.",
  body: `
<h2>Leads don't die loudly — they fade</h2>
<p>Someone asks about pricing on Monday. You mean to reply Tuesday. By Friday they've bought elsewhere, and you never noticed. That's a tracking failure, not a selling failure — and it happens because WhatsApp gives you no memory.</p>
<p>LeadDock gives every conversation a state: <strong>New Lead → Contacted → Interested → Follow Up → Qualified → Won/Lost</strong>. Change a status in one click. Every change is logged to the contact's timeline.</p>
<h2>The daily rhythm</h2>
<ul>
<li><strong>Morning:</strong> open the Today dashboard — see due and overdue follow-ups at a glance.</li>
<li><strong>During the day:</strong> capture context as you chat. Tags like Hot or Wholesale keep priorities visible.</li>
<li><strong>Before close:</strong> clear today's list. Nothing carries over silently.</li>
</ul>
<h2>Search that finds money</h2>
<p>"Who asked about the ₹40k package three weeks ago?" Search across names, phones, companies, notes and tags, then filter by status or due date. Answers in seconds, not scroll-back sessions.`,
});

const quickRepliesBody = intentPage({
  h1: "WhatsApp quick replies with superpowers",
  lede: "Save your best answers once. Insert them with /shortcuts or one click — with variables that personalize themselves.",
  body: `
<h2>Stop typing the same thing forty times a week</h2>
<p>Pricing lines. Catalogue blurbs. Greetings, thank-yous, meeting confirmations. In a busy inbox these messages consume hours — and typos creep in exactly when it matters.</p>
<p>LeadDock stores reusable replies inside WhatsApp Web. Click <strong>⚡ Replies</strong> near the composer, pick one, and it drops into the message box ready to send.</p>
<h2>Slash shortcuts for speed</h2>
<p>Prefer the keyboard? Type <span class="kbd">/price</span> directly in the composer. LeadDock recognizes the shortcut and offers the matching reply instantly. Your muscle memory becomes your CRM.</p>
<h2>Variables do the personalizing</h2>
<p>Templates understand <span class="kbd">{{name}}</span>, <span class="kbd">{{phone}}</span>, <span class="kbd">{{company}}</span> and <span class="kbd">{{product}}</span>:</p>
<p style="background:var(--bg-soft); border-radius:12px; padding:18px;"><span class="kbd">Hi {{name}}, thanks for asking about {{product}}!</span><br><br>becomes<br><br><strong>Hi Rahul, thanks for asking about Industrial Mats!</strong></p>
<p>Unknown variables stay visible instead of silently vanishing — so a broken template announces itself before your customer sees it.</p>
<h2>Always human-approved</h2>
<p>Replies are inserted, never sent. You review every message and press Enter yourself. No auto-send exists anywhere in LeadDock.`,
});

const followUpBody = intentPage({
  h1: "Never miss a WhatsApp follow-up again",
  lede: "Set Today, Tomorrow, In 3 days or Next week with one tap — then let the daily dashboard tell you exactly who's waiting.",
  body: `
<h2>Follow-ups are where deals are won</h2>
<p>Research keeps confirming what sellers know: most sales happen after the first touch. But WhatsApp has no reminders, no snooze, no "get back to this later". The result? Good intentions buried under new messages.</p>
<p>While chatting with any contact, set a follow-up in one tap: <strong>Today · Tomorrow · In 3 days · Next week · custom date</strong>. It attaches to the contact instantly.</p>
<h2>Your morning briefing</h2>
<p>The popup dashboard lists today's follow-ups with their context — who, why, and an <strong>Open Chat</strong> button that jumps straight to the conversation. Overdue items surface in red until handled.</p>
<div class="mockup" style="max-width:420px; margin:26px auto;" role="img" aria-label="Today dashboard mockup">
  <div class="mockup-bar"><span class="mockup-dot"></span><span class="mockup-dot"></span><span class="mockup-dot"></span></div>
  <div style="padding:18px;">
    <div class="mock-panel-title"><span>TODAY — 3 follow-ups</span></div>
    <div class="fu-row"><span>Rahul Sharma · Quotation</span><span class="fu-due">Due</span></div>
    <div class="fu-row"><span>Neha Patel · Catalogue</span><span class="fu-due">Due</span></div>
    <div class="fu-row" style="border-color:#fecaca;background:#fef2f2;"><span>Arjun Mehta · Payment</span><span style="color:#b91c1c;font-weight:700;">Overdue</span></div>
  </div>
</div>
<h2>Reminders, not robots</h2>
<p>LeadDock reminds you; it never messages anyone by itself. When you're ready, open the chat, hit ⚡ Replies for the perfect nudge message, and send it yourself.`,
});

const agenciesBody =
  pageHero("Deploy LeadDock for your clients", "A white-label WhatsApp Web CRM your agency can brand, configure and deliver — backed by a license built for client work.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container" style="max-width:820px;">
    <p>Agencies keep asking clients the same question: "Where do your leads live?" The honest answer is usually WhatsApp — untracked. With the LeadDock Agency license, you can be the one who fixes that, under your own brand.</p>
    <div class="grid grid-3" style="margin-top:30px;">
      <div class="card"><div class="card-icon">🎨</div><h3>Brand it in minutes</h3><p>Name, logo, colors and support email all live in one config file. Each client gets their own identity — not a watermark of ours.</p></div>
      <div class="card"><div class="card-icon">📦</div><h3>Deliver binaries</h3><p>Build a clean installable ZIP per client. Clients receive the finished extension — never your source, never ours.</p></div>
      <div class="card"><div class="card-icon">💰</div><h3>Charge for value</h3><p>Bundle setup, customization, training and ongoing support into your retainer. You set those prices; we don't touch that relationship.</p></div>
    </div>
    <h2 style="margin-top:44px;">What $99 includes</h2>
    <ul>
      <li>Full source code and build tooling</li>
      <li>Up to <strong>5 distinct client deployments</strong> (need more? buy another license)</li>
      <li>All v1.x updates</li>
      <li>White-label documentation and customization guide</li>
      <li>Email support for your team</li>
    </ul>
    <h2>The workflow agencies love</h2>
    <ol class="steps" style="grid-template-columns:repeat(2,1fr);">
      <li><h3>Brand</h3><p>Edit one config file, drop in the client's logo and colors.</p></li>
      <li><h3>Configure</h3><p>Load the client's statuses, tags and standard replies.</p></li>
      <li><h3>Build</h3><p>One command produces a distributable ZIP.</p></li>
      <li><h3>Deliver</h3><p>Hand over the binary + a quickstart session. Done.</p></li>
    </ol>
    <div class="notice" style="margin-top:34px;"><strong>Honest boundaries.</strong> The Agency license covers delivering up to five branded end products. It does not permit reselling LeadDock itself as a developer kit. Clients receive binaries only.</div>
    <div class="btn-row" style="justify-content:center; margin-top:38px;">
      <a class="btn btn-primary btn-lg" href="/pricing">Get the Agency license — $99</a>
      <a class="btn btn-secondary btn-lg" href="/developer-kit">Inspect the developer kit</a>
    </div>
  </div>
</section>
`;

const devkitBody =
  pageHero("The developer kit", "Complete source. Clean architecture. Build scripts that just work. Rebrand and ship your own WhatsApp Web CRM.", [["/", "Home"]]) +
  `
<section class="section" style="padding-top:20px;">
  <div class="container" style="max-width:820px;">
    <p>LeadDock was engineered to be sold as source: vanilla JavaScript, no framework lock-in, a WhatsApp adapter isolated from the CRM core, and a single branding config. Buyers get a codebase worth paying for.</p>
    <h2>Architecture</h2>
<pre style="background:#0f172a;color:#e2e8f0;border-radius:12px;padding:22px;font-size:.88rem;line-height:1.7;overflow-x:auto;">WhatsApp Adapter  ← selectors, observer, composer, navigation
       ↓
     CRM Core     ← contacts, notes, tags, statuses, follow-ups
       ↓
      UI Layer    ← panel, palette, modals, reply picker
       ↓
chrome.storage.local</pre>
    <p>The CRM layer never touches WhatsApp DOM internals. When WhatsApp changes its markup — and it will — you patch one adapter directory while your CRM logic stays untouched.</p>
    <h2>Tooling included</h2>
    <ul>
      <li><code>npm run lint</code> · <code>test</code> (62 tests) · <code>build</code> · <code>package</code> · <code>release</code></li>
      <li>CI workflow producing signed release ZIPs + SHA-256 checksums</li>
      <li>Versioned storage schema with migrations</li>
      <li>Fixtures: demo contacts, replies, statuses, tags, CSV templates</li>
      <li>13 docs: architecture, customization, publishing, QA checklist…</li>
    </ul>
    <h2>White-label in four steps</h2>
    <ol class="steps">
      <li><h3>Config</h3><p>Edit <code>src/config/brand.js</code> — every buyer-facing string lives there.</p></li>
      <li><h3>Icons</h3><p>Replace PNGs in <code>assets/icons/</code>.</p></li>
      <li><h3>Build</h3><p><code>npm install && npm run build</code></p></li>
      <li><h3>Package</h3><p><code>npm run package</code> → distributable ZIP + checksums.</p></li>
    </ol>
    <div class="notice" style="margin-top:30px;"><strong>License scope.</strong> Commercial ($59): one branded end product, internal use. Agency ($99): up to 5 client deployments, binary-only. Neither tier permits reselling the source itself.</div>
    <div class="btn-row" style="justify-content:center; margin-top:36px;">
      <a class="btn btn-primary btn-lg" href="/pricing">Get the kit — from $59</a>
      <a class="btn btn-secondary btn-lg" href="/docs">Read the docs</a>
    </div>
  </div>
</section>
`;

const notFoundBody = `
<section class="page-hero">
  <div class="container">
    <h1>404 — Page not found</h1>
    <p class="lede">That URL doesn't exist. Try one of these instead:</p>
    <p><a href="/">Home</a> · <a href="/features">Features</a> · <a href="/pricing">Pricing</a> · <a href="/demo">Demo</a> · <a href="/docs">Docs</a></p>
  </div>
</section>
`;

// ---------- assemble ----------

const pages = [
  { file: "features.html", title: "Features — LeadDock WhatsApp Web CRM", desc: "Statuses, tags, notes, quick replies, slash shortcuts, follow-ups, search, CSV import/export and more. See every LeadDock feature.", active: "/features", body: featuresBody },
  { file: "pricing.html", title: "Pricing — Get LeadDock from $59 (one-time)", desc: "One-time pricing: $59 Commercial and $99 Agency licenses. Full source included. No subscriptions, ever.", active: "/pricing", body: pricingBody },
  { file: "demo.html", title: "Demo — LeadDock WhatsApp Web CRM in 60 seconds", desc: "See LeadDock work: statuses, notes, slash shortcuts, quick replies, follow-ups and the Today dashboard — on fictional demo data.", active: "/demo", body: demoBody },
  { file: "faq.html", title: "FAQ — LeadDock WhatsApp Web CRM", desc: "Answers about privacy, permissions, licensing, updates and what LeadDock never does: no auto-send, no bulk messaging, no scraping.", active: null, jsonld: faqJsonLd, body: faqBody },
  { file: "docs.html", title: "Docs — Install & customize LeadDock", desc: "Quickstart install guide, demo mode, white-label customization and troubleshooting for the LeadDock WhatsApp Web CRM.", active: "/docs", body: docsBody },
  { file: "privacy.html", title: "Privacy Policy — LeadDock", desc: "LeadDock is local-first: CRM records stay in your browser. What we read, what we store, what we transmit (nothing).", active: null, body: privacyBody },
  { file: "license.html", title: "License Terms — LeadDock Commercial & Agency", desc: "Plain-language license terms: Commercial $59 (internal use) and Agency $99 (up to 5 client deployments). No source resale in any tier.", active: null, body: licenseBody },
  { file: "whatsapp-crm.html", title: "WhatsApp CRM — Manage leads inside WhatsApp | LeadDock", desc: "A lightweight CRM layer for WhatsApp: track lead statuses, notes, tags and follow-ups without leaving your chats. Local-first Chrome extension.", active: null, body: whatsappCrmBody },
  { file: "whatsapp-web-crm.html", title: "WhatsApp Web CRM — Chrome Extension | LeadDock", desc: "Manifest V3 CRM for WhatsApp Web. Local-first, minimal permissions, full source available. Turn web.whatsapp.com into your sales workspace.", active: null, body: whatsappWebCrmBody },
  { file: "whatsapp-lead-tracker.html", title: "WhatsApp Lead Tracker — Track chats as a pipeline | LeadDock", desc: "Track every WhatsApp enquiry from New Lead to Won. Statuses, timelines, search and daily follow-ups — right beside your chats.", active: null, body: leadTrackerBody },
  { file: "whatsapp-quick-replies.html", title: "WhatsApp Quick Replies Chrome Extension | LeadDock", desc: "Save reusable replies, insert with /shortcuts or one click, personalize with {{name}} variables. Never auto-sends — you always press enter.", active: null, body: quickRepliesBody },
  { file: "whatsapp-follow-up.html", title: "WhatsApp Follow-Up Reminders CRM | LeadDock", desc: "Set follow-ups (today, tomorrow, 3 days, custom) on any WhatsApp chat. A daily dashboard shows who's waiting. Reminders only — never auto-send.", active: null, body: followUpBody },
  { file: "for-agencies.html", title: "White-Label WhatsApp CRM for Agencies | LeadDock", desc: "Deliver branded WhatsApp Web CRMs to your SMB clients. Agency license: 5 client deployments, binary-only handoff, one config-file rebrand.", active: "/for-agencies", body: agenciesBody },
  { file: "developer-kit.html", title: "WhatsApp CRM Source Code — Developer Kit | LeadDock", desc: "Clean vanilla-JS WhatsApp Web CRM source: adapter architecture, tests, CI, build tooling and white-label config. Licensed from $59.", active: null, body: devkitBody },
  { file: "404.html", title: "Page not found — LeadDock", desc: "Page not found.", active: null, body: notFoundBody },
];

for (const p of pages) {
  let html = head(p.title, p.desc, "/" + p.file.replace(".html", "").replace("index", ""));
  html += p.jsonld ? `<script type="application/ld+json">${p.jsonld}</script>\n` : "";
  html += header(p.active);
  html += "\n" + p.body;
  html += footer();
  fs.writeFileSync(path.join(__dirname, p.file), html);
  console.log("built", p.file);
}

// robots.txt
fs.writeFileSync(
  path.join(__dirname, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
);
console.log("built robots.txt");

// sitemap.xml (canonical URLs only)
const urls = [
  "/", "/features", "/pricing", "/demo", "/faq", "/docs",
  "/privacy", "/license",
  "/whatsapp-crm", "/whatsapp-web-crm", "/whatsapp-lead-tracker",
  "/whatsapp-quick-replies", "/whatsapp-follow-up",
  "/for-agencies", "/developer-kit",
];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap);
console.log("built sitemap.xml");

// favicon.svg
fs.writeFileSync(
  path.join(__dirname, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f766e"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><text x="32" y="42" font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="26" font-weight="800" fill="#ffffff" text-anchor="middle">LD</text></svg>\n`
);
console.log("built favicon.svg");

console.log("\nDone.");
