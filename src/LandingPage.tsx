import { useState, useEffect, useRef } from "react";

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ onEnter }: { onEnter: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "How It Works", "Features", "Pricing", "Contact"];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,12,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.15)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-white font-bold text-base" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Business360</span>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 mx-auto">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, "-"))}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <button onClick={onEnter} className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
            Login
          </button>
          <button
            onClick={onEnter}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto text-white/70 hover:text-white p-2">
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t px-5 py-4 space-y-1" style={{ borderColor: "rgba(99,102,241,0.15)", background: "rgba(7,12,26,0.97)" }}>
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, "-"))} className="block w-full text-left px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              {l}
            </button>
          ))}
          <div className="flex gap-3 pt-3 border-t mt-3" style={{ borderColor: "rgba(99,102,241,0.15)" }}>
            <button onClick={onEnter} className="flex-1 py-2.5 text-sm text-white/70 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Login</button>
            <button onClick={onEnter} className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors" style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)", fontFamily: "'Instrument Sans', sans-serif" }}>Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
      {/* Glow */}
      <div className="absolute -inset-8 rounded-3xl opacity-30 blur-3xl" style={{ background: "radial-gradient(ellipse at 60% 40%, #4f46e5 0%, #3b82f6 40%, transparent 70%)" }} />

      {/* Browser chrome */}
      <div className="relative rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: "rgba(99,102,241,0.25)", boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)" }}>
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0d1226", borderBottom: "1px solid rgba(99,102,241,0.15)" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="flex-1 mx-3 h-6 rounded-md flex items-center px-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>app.business360.in/dashboard</span>
          </div>
        </div>

        {/* Dashboard UI */}
        <div className="flex" style={{ background: "#070c1a", height: "360px" }}>
          {/* Sidebar */}
          <div className="w-44 flex-shrink-0 flex flex-col py-3" style={{ background: "#0d1226", borderRight: "1px solid rgba(99,102,241,0.12)" }}>
            <div className="flex items-center gap-2 px-4 pb-3 mb-1" style={{ borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "#4f46e5" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="text-[11px] font-bold" style={{ color: "#e8eaf6", fontFamily: "'Instrument Sans', sans-serif" }}>Business360</span>
            </div>
            <div className="px-2 py-2 space-y-0.5 flex-1">
              {[
                { label: "Dashboard", active: true },
                { label: "New Bill", dashed: true },
                { label: "Bills" },
                { label: "Customers" },
                { label: "Analytics" },
              ].map(({ label, active, dashed }) => (
                <div key={label} className="px-2 py-1.5 rounded-md text-[10px]" style={{
                  background: active ? "#4f46e5" : dashed ? "transparent" : "transparent",
                  color: active ? "#fff" : dashed ? "#e8eaf6" : "rgba(232,234,246,0.5)",
                  border: dashed ? "1px dashed rgba(99,102,241,0.3)" : "none",
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {label}
                </div>
              ))}
            </div>
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 px-2 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0" style={{ background: "#4f46e5" }}>R</div>
                <div>
                  <div className="text-[9px] font-medium" style={{ color: "#e8eaf6", fontFamily: "'Inter', sans-serif" }}>Rahul Sharma</div>
                  <div className="text-[8px]" style={{ color: "rgba(232,234,246,0.4)" }}>Free Plan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "#e8eaf6", fontFamily: "'Instrument Sans', sans-serif" }}>Good morning 👋</div>
                <div className="text-[10px]" style={{ color: "rgba(232,234,246,0.4)", fontFamily: "'Inter', sans-serif" }}>19 Aug 2026 · Sharma's Café</div>
              </div>
              <div className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white" style={{ background: "#4f46e5", fontFamily: "'Instrument Sans', sans-serif" }}>+ New Bill</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Today's Sales", value: "₹3,934" },
                { label: "Total Bills", value: "28" },
                { label: "Customers", value: "19" },
                { label: "Avg. Bill", value: "₹984" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg p-2.5" style={{ background: "#0d1226", border: "1px solid rgba(99,102,241,0.12)" }}>
                  <div className="text-[8px] mb-1" style={{ color: "rgba(232,234,246,0.4)", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                  <div className="text-[13px] font-semibold" style={{ color: "#e8eaf6", fontFamily: "'Instrument Sans', sans-serif" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Transactions */}
            <div className="rounded-xl overflow-hidden" style={{ background: "#0d1226", border: "1px solid rgba(99,102,241,0.12)" }}>
              <div className="px-3 py-2" style={{ borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
                <span className="text-[10px] font-semibold" style={{ color: "#e8eaf6", fontFamily: "'Instrument Sans', sans-serif" }}>Recent Transactions</span>
              </div>
              {[
                { name: "Priya Menon", bill: "INV-0024", amount: "₹523", status: "paid" },
                { name: "Arjun Sharma", bill: "INV-0023", amount: "₹490", status: "paid" },
                { name: "Kavitha Rao", bill: "INV-0022", amount: "₹1,744", status: "paid" },
                { name: "Rohan Verma", bill: "INV-0021", amount: "₹1,177", status: "pending" },
              ].map(({ name, bill, amount, status }) => (
                <div key={bill} className="flex items-center px-3 py-2 gap-3" style={{ borderBottom: "1px solid rgba(99,102,241,0.06)" }}>
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.1)" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-medium truncate" style={{ color: "#e8eaf6", fontFamily: "'Inter', sans-serif" }}>{name}</div>
                    <div className="text-[8px]" style={{ color: "rgba(232,234,246,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>{bill}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-semibold" style={{ color: "#e8eaf6", fontFamily: "'JetBrains Mono', monospace" }}>{amount}</div>
                    <div className="text-[8px] px-1.5 py-0.5 rounded" style={{
                      background: status === "paid" ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
                      color: status === "paid" ? "#4ade80" : "#fbbf24",
                    }}>{status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onEnter }: { onEnter: () => void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#060b18" }}>
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]" style={{ background: "#4f46e5" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px]" style={{ background: "#3b82f6" }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm" style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontFamily: "'Inter', sans-serif" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Now live for local businesses across India
            </div>

            <h1 className="mb-6 leading-[1.08] tracking-tight" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              <span className="block text-5xl lg:text-6xl xl:text-7xl font-bold text-white">Smart Billing.</span>
              <span className="block text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ background: "linear-gradient(135deg, #818cf8 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Better Business.
              </span>
            </h1>

            <p className="text-lg lg:text-xl mb-10 leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif" }}>
              Generate digital bills in seconds, manage customer records, and send e-bills directly to WhatsApp — all from one simple platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onEnter}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)", boxShadow: "0 8px 32px rgba(79,70,229,0.35)", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base border transition-all hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                See How It Works
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 mt-10 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>2,400+</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>Bills generated</div>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>500+</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>Merchants using it</div>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>4.9★</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>Merchant rating</div>
              </div>
            </div>
          </div>

          {/* Right — mockup */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #060b18)" }} />
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Enter Customer Details",
      desc: "Add the customer's name and WhatsApp number. Business360 remembers returning customers automatically.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      num: "02",
      title: "Add Purchased Items",
      desc: "Enter item names, quantity, and price. Totals are calculated automatically as you type.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
    },
    {
      num: "03",
      title: "Generate E-Bill",
      desc: "Business360 instantly creates a professional digital invoice with your business details, GST, and grand total.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      num: "04",
      title: "Send & Save",
      desc: "The bill is sent directly to the customer's WhatsApp number and securely saved to Business360 for future reference.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-28" style={{ background: "#060b18" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border" style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            How It Works
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>
            From customer walk-in to WhatsApp receipt — done in under 30 seconds.
          </p>
        </div>

        {/* Steps — alternating layout on desktop */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px -translate-x-1/2" style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(99,102,241,0.1))" }} />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Content */}
                <div className={`${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-400" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="text-xs font-bold mb-2 tracking-widest" style={{ color: "#6366f1", fontFamily: "'JetBrains Mono', monospace" }}>{step.num}</div>
                      <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{step.title}</h3>
                      <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Visual indicator on the line */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className={`${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full opacity-30 blur-xl" style={{ background: "#4f46e5", transform: "scale(1.5)" }} />
                      <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black border" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(59,130,246,0.1))", borderColor: "rgba(99,102,241,0.25)", color: "#6366f1", fontFamily: "'Instrument Sans', sans-serif" }}>
                        {step.num}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: "Fast Digital Billing",
      desc: "Create a complete professional bill in under 30 seconds. No paperwork, no manual errors, no wasted time.",
      color: "#6366f1",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      ),
      title: "WhatsApp E-Bills",
      desc: "Send professional digital invoices directly to your customer's WhatsApp number with one tap.",
      color: "#25d366",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Customer Records",
      desc: "Every customer's purchase history, contact, and spending data is organized and always accessible.",
      color: "#3b82f6",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      title: "Bill History",
      desc: "Search and retrieve any past transaction instantly. Filter by customer, date, or amount.",
      color: "#8b5cf6",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
        </svg>
      ),
      title: "Business Insights",
      desc: "See your daily sales, top items, best customers, and revenue trends at a glance.",
      color: "#f59e0b",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
      title: "Simple & Easy",
      desc: "No training needed. If you can use WhatsApp, you can use Business360. Designed for real merchants.",
      color: "#10b981",
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-28" style={{ background: "#0a0f20" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 border" style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            What You Get
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Everything You Need
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>
            Built specifically for local businesses. No complicated setup. No expensive software.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feat-card group rounded-2xl p-6 border cursor-default${visible ? " visible" : ""}`}
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(99,102,241,0.12)",
                transitionDelay: visible ? `${i * 90}ms` : "0ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = `${f.color}50`;
                el.style.background = `${f.color}0a`;
                el.style.boxShadow = `0 12px 40px ${f.color}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = visible ? "translateY(0)" : "translateY(28px)";
                el.style.borderColor = "rgba(99,102,241,0.12)";
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${f.color}18`,
                  color: f.color,
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.18) rotate(-4deg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1) rotate(0deg)"; }}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who Is It For ────────────────────────────────────────────────────────────

function WhoIsItFor() {
  const [paused, setPaused] = useState(false);

  const businesses = [
    {
      label: "Cafes",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/>
          <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
        </svg>
      ),
    },
    {
      label: "Restaurants",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="2" x2="3" y2="22"/><line x1="21" y1="2" x2="21" y2="22"/>
          <path d="M3 7h6a6 6 0 0 1 6 6v0H3"/>
          <path d="M21 2v6a6 6 0 0 1-6 6"/>
        </svg>
      ),
    },
    {
      label: "Salons",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      label: "Retail Shops",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
    },
    {
      label: "Gyms",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 6.5h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>
          <path d="M16.5 6.5h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>
          <line x1="8.5" y1="10" x2="15.5" y2="10"/>
          <line x1="8.5" y1="14" x2="15.5" y2="14"/>
          <line x1="5" y1="9" x2="5" y2="15"/><line x1="19" y1="9" x2="19" y2="15"/>
        </svg>
      ),
    },
    {
      label: "Local Businesses",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
  ];

  // Duplicate for seamless loop: track width = 2× one set, animate to -50%
  const loopItems = [...businesses, ...businesses];

  return (
    <section id="pricing" className="py-28" style={{ background: "#060b18" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — unchanged */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border" style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Who It's For
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.1 }}>
              Built for Every<br />Local Merchant
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>
              Whether you run a small café or a busy retail shop, Business360 fits your workflow. No complex software — just a clean, fast billing tool built for real businesses.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.15)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.15)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Ready in minutes</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>Set up your business profile and start billing immediately. No training required.</p>
              </div>
            </div>
          </div>

          {/* Right — marquee */}
          <div className="relative overflow-hidden" style={{
            maskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}>
            <div
              className={`marquee-track${paused ? " paused" : ""}`}
              style={{ gap: "16px", padding: "8px 0" }}
            >
              {loopItems.map(({ icon, label }, i) => (
                <div
                  key={`${label}-${i}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl border cursor-default"
                  style={{
                    width: "168px",
                    height: "130px",
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(99,102,241,0.12)",
                    transition: "transform 0.25s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    setPaused(true);
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1.06)";
                    el.style.borderColor = "rgba(99,102,241,0.45)";
                    el.style.background = "rgba(99,102,241,0.09)";
                    el.style.boxShadow = "0 0 28px rgba(99,102,241,0.2), 0 8px 24px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    setPaused(false);
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1)";
                    el.style.borderColor = "rgba(99,102,241,0.12)";
                    el.style.background = "rgba(255,255,255,0.02)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="mb-3 text-indigo-400" style={{ color: "#818cf8" }}>{icon}</div>
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA({ onEnter }: { onEnter: () => void }) {
  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "#060b18" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[300px] rounded-full opacity-15 blur-[80px]" style={{ background: "radial-gradient(ellipse, #4f46e5 0%, #3b82f6 50%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div className="rounded-3xl px-8 py-16 border" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(59,130,246,0.08) 100%)", borderColor: "rgba(99,102,241,0.2)" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border" style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.25)", color: "#a5b4fc", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Get Started Today
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.1 }}>
            Ready to Simplify<br />Your Business?
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>
            Start managing billing and customer transactions with Business360. Free to get started.
          </p>
          <button
            onClick={onEnter}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl"
            style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)", boxShadow: "0 12px 40px rgba(79,70,229,0.4)", fontFamily: "'Instrument Sans', sans-serif", fontSize: "1rem" }}
          >
            Get Started with Business360
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>No credit card required · Set up in minutes</p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    { heading: "Product", links: ["Dashboard", "New Bill", "Bill History", "Analytics"] },
    { heading: "Features", links: ["Digital Billing", "WhatsApp E-Bills", "Customer Records", "Business Insights"] },
    { heading: "Pricing", links: ["Free Plan", "Pro Plan", "Enterprise", "Compare Plans"] },
    { heading: "Contact", links: ["Help Center", "WhatsApp Support", "Email Us", "Community"] },
  ];

  return (
    <footer style={{ background: "#040810", borderTop: "1px solid rgba(99,102,241,0.1)" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-bold text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Business360</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
              Smart tools for smarter businesses.
            </p>
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold mb-4 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(99,102,241,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}>
            © 2026 Business360. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-xs transition-colors" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav onEnter={onEnter} />
      <Hero onEnter={onEnter} />
      <HowItWorks />
      <Features />
      <WhoIsItFor />
      <FinalCTA onEnter={onEnter} />
      <Footer />
    </div>
  );
}
