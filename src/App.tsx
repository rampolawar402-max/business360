import { useState, createContext, useContext } from "react";
import LandingPage from "./LandingPage";

// ─── Theme ────────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "light",
  setTheme: () => {},
});
const useTheme = () => useContext(ThemeContext);

// ─── Types ───────────────────────────────────────────────────────────────────

interface LineItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface Bill {
  id: string;
  billNumber: string;
  customer: { name: string; phone: string };
  items: LineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  date: Date;
  status: "paid" | "pending";
}

interface Customer {
  name: string;
  phone: string;
  totalBills: number;
  totalSpent: number;
  lastVisit: Date;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_BILLS: Bill[] = [
  {
    id: "b1", billNumber: "INV-0024",
    customer: { name: "Priya Menon", phone: "9876543210" },
    items: [
      { id: "i1", name: "Cappuccino", qty: 2, price: 180 },
      { id: "i2", name: "Croissant", qty: 1, price: 120 },
    ],
    subtotal: 480, discount: 0, tax: 43, total: 523, date: new Date(Date.now() - 3_600_000), status: "paid",
  },
  {
    id: "b2", billNumber: "INV-0023",
    customer: { name: "Arjun Sharma", phone: "9123456789" },
    items: [
      { id: "i3", name: "Haircut", qty: 1, price: 350 },
      { id: "i4", name: "Hair Wash", qty: 1, price: 150 },
    ],
    subtotal: 500, discount: 50, tax: 40, total: 490, date: new Date(Date.now() - 7_200_000), status: "paid",
  },
  {
    id: "b3", billNumber: "INV-0022",
    customer: { name: "Kavitha Rao", phone: "9988776655" },
    items: [
      { id: "i5", name: "Monthly Gym Plan", qty: 1, price: 1800 },
    ],
    subtotal: 1800, discount: 200, tax: 144, total: 1744, date: new Date(Date.now() - 14_400_000), status: "paid",
  },
  {
    id: "b4", billNumber: "INV-0021",
    customer: { name: "Rohan Verma", phone: "9871234567" },
    items: [
      { id: "i6", name: "Butter Chicken", qty: 2, price: 320 },
      { id: "i7", name: "Garlic Naan", qty: 4, price: 60 },
      { id: "i8", name: "Mango Lassi", qty: 2, price: 80 },
    ],
    subtotal: 1080, discount: 0, tax: 97, total: 1177, date: new Date(Date.now() - 86_400_000), status: "pending",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const formatDateTime = (d: Date) =>
  `${formatDate(d)}, ${formatTime(d)}`;

const uid = () => Math.random().toString(36).slice(2, 9);

const billNumberNext = (bills: Bill[]) =>
  `INV-${String(bills.length + 25).padStart(4, "0")}`;

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = {
  dashboard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  bill: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  chart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  store: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  phone: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 4.2 2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  whatsapp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
  arrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  x: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  print: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  ),
  tag: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  trending: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
};

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "muted" }) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: "var(--secondary)", color: "var(--secondary-foreground)" },
    success: { background: "var(--badge-success-bg)", color: "var(--badge-success-fg)", border: "1px solid var(--badge-success-border)" },
    warning: { background: "var(--badge-warning-bg)", color: "var(--badge-warning-fg)", border: "1px solid var(--badge-warning-border)" },
    muted: { background: "var(--muted)", color: "var(--muted-foreground)" },
  };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium font-display" style={styles[variant]}>
      {children}
    </span>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold font-display text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Invoice Preview ──────────────────────────────────────────────────────────

function InvoiceView({ bill, onBack }: { bill: Bill; onBack: () => void }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <span className="text-border">·</span>
        <span className="text-sm font-medium font-display">{bill.billNumber}</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-foreground">
            <Icon.print /> Print
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#25d366] text-white rounded-lg hover:bg-[#20b85a] transition-colors font-medium">
            <Icon.whatsapp /> Resend
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-7 text-white" style={{ background: "var(--invoice-gradient)" }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <span className="text-xs font-medium text-white/60 tracking-wider uppercase font-display">Business360</span>
                </div>
                <h2 className="text-xl font-semibold font-display">Sharma's Café & Kitchen</h2>
                <p className="text-sm text-white/60 mt-0.5">+91 98765 43210 · HSR Layout, Bangalore</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold font-mono-data">{bill.billNumber}</p>
                <p className="text-sm text-white/60 mt-0.5">{formatDateTime(bill.date)}</p>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="px-8 py-5 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Billed To</p>
                <p className="font-semibold font-display text-foreground">{bill.customer.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Icon.phone /> +91 {bill.customer.phone}
                </p>
              </div>
              <Badge variant={bill.status === "paid" ? "success" : "warning"}>
                {bill.status === "paid" ? (
                  <span className="flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Paid
                  </span>
                ) : "Pending"}
              </Badge>
            </div>
          </div>

          {/* Items */}
          <div className="px-8 py-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[11px] text-muted-foreground uppercase tracking-wider font-medium pb-3">Item</th>
                  <th className="text-center text-[11px] text-muted-foreground uppercase tracking-wider font-medium pb-3">Qty</th>
                  <th className="text-right text-[11px] text-muted-foreground uppercase tracking-wider font-medium pb-3">Price</th>
                  <th className="text-right text-[11px] text-muted-foreground uppercase tracking-wider font-medium pb-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bill.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 text-sm font-medium text-foreground">{item.name}</td>
                    <td className="py-3 text-sm text-center text-muted-foreground font-mono-data">{item.qty}</td>
                    <td className="py-3 text-sm text-right text-muted-foreground font-mono-data">{formatCurrency(item.price)}</td>
                    <td className="py-3 text-sm text-right font-medium font-mono-data text-foreground">{formatCurrency(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-5 pt-5 border-t border-border space-y-2.5">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono-data">{formatCurrency(bill.subtotal)}</span>
              </div>
              {bill.discount > 0 && (
                <div className="flex justify-between text-sm" style={{ color: "var(--discount-fg)" }}>
                  <span>Discount</span>
                  <span className="font-mono-data">− {formatCurrency(bill.discount)}</span>
                </div>
              )}
              {bill.tax > 0 && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>GST (9%)</span>
                  <span className="font-mono-data">{formatCurrency(bill.tax)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="text-base font-semibold font-display">Total Amount</span>
                <span className="text-xl font-bold font-mono-data text-foreground">{formatCurrency(bill.total)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-muted/30 border-t border-border text-center">
            <p className="text-sm font-medium text-foreground flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Thank you for your visit
            </p>
            <p className="text-xs text-muted-foreground mt-1">Powered by Business360 · Digital billing for local businesses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── New Bill Wizard ──────────────────────────────────────────────────────────

function NewBill({ onSave, bills }: { onSave: (bill: Bill) => void; bills: Bill[] }) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [items, setItems] = useState<LineItem[]>([{ id: uid(), name: "", qty: 1, price: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [success, setSuccess] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const taxAmount = taxEnabled ? Math.round(subtotal * 0.09) : 0;
  const total = Math.max(0, subtotal - discount + taxAmount);

  const addItem = () => setItems((p) => [...p, { id: uid(), name: "", qty: 1, price: 0 }]);
  const removeItem = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const updateItem = (id: string, field: keyof LineItem, value: string | number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const generate = () => {
    const bill: Bill = {
      id: uid(),
      billNumber: billNumberNext(bills),
      customer,
      items,
      subtotal,
      discount,
      tax: taxAmount,
      total,
      date: new Date(),
      status: "paid",
    };
    onSave(bill);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-scale-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "var(--success-pulse)" }} />
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
            style={{ background: "var(--success-circle-bg)", border: "2px solid var(--success-circle-border)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ stroke: "var(--success-stroke)" }}>
              <polyline points="20 6 9 17 4 12" className="success-check" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold font-display text-foreground">E-Bill Generated!</h2>
        <div className="mt-4 space-y-2 text-center">
          <div
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
            style={{ color: "var(--success-pill-fg)", background: "var(--success-pill-bg)", border: "1px solid var(--success-pill-border)" }}
          >
            <Icon.whatsapp />
            Sent to {customer.name} · +91 {customer.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Bill saved to Business360 · {billNumberNext(bills)}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Total billed: <strong className="text-foreground font-mono-data">{formatCurrency(total)}</strong>
        </p>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => { setStep(1); setCustomer({ name: "", phone: "" }); setItems([{ id: uid(), name: "", qty: 1, price: 0 }]); setDiscount(0); setSuccess(false); }}
            className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          >
            New Bill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold font-display transition-all ${
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {step > s ? <Icon.check /> : s}
            </div>
            <span className={`text-sm hidden sm:block ${step === s ? "font-medium text-foreground" : "text-muted-foreground"}`}>
              {["Customer", "Items", "Summary"][s - 1]}
            </span>
            {s < 3 && <div className={`h-px flex-1 w-8 mx-1 ${step > s ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-semibold font-display mb-1">Customer Details</h2>
          <p className="text-sm text-muted-foreground mb-6">Enter the customer's name and WhatsApp number</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Customer Name</label>
              <input
                type="text"
                placeholder="e.g. Priya Menon"
                value={customer.name}
                onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp Number</label>
              <div className="flex">
                <span className="px-4 py-3 bg-muted border border-border border-r-0 rounded-l-xl text-sm text-muted-foreground font-mono-data">+91</span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={customer.phone}
                  onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                  className="flex-1 px-4 py-3 border border-border rounded-r-xl text-sm bg-card text-foreground placeholder:text-muted-foreground font-mono-data"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!customer.name || customer.phone.length < 10}
            className="mt-8 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium font-display text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Items <Icon.arrowRight />
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-semibold font-display mb-1">Add Items</h2>
          <p className="text-sm text-muted-foreground mb-6">For <span className="text-foreground font-medium">{customer.name}</span></p>

          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 px-1">
              <span className="col-span-5 text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Item</span>
              <span className="col-span-2 text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-center">Qty</span>
              <span className="col-span-3 text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Price (₹)</span>
              <span className="col-span-2 text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-right">Total</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-card border border-border rounded-xl p-2.5 group">
                <input
                  type="text"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  className="col-span-5 px-2.5 py-2 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 1)}
                  className="col-span-2 px-2 py-2 border border-border rounded-lg text-sm bg-background text-foreground text-center font-mono-data"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={item.price || ""}
                  onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                  className="col-span-3 px-2.5 py-2 border border-border rounded-lg text-sm bg-background text-foreground font-mono-data"
                />
                <div className="col-span-2 flex items-center justify-end gap-1.5">
                  <span className="text-sm font-medium font-mono-data text-foreground">{formatCurrency(item.qty * item.price)}</span>
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all ml-1 flex-shrink-0"
                    >
                      <Icon.trash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="mt-3 w-full py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <Icon.plus /> Add Another Item
          </button>

          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(1)} className="px-5 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={items.every((i) => !i.name || i.price === 0)}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-medium font-display text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review Bill <Icon.arrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-semibold font-display mb-1">Bill Summary</h2>
          <p className="text-sm text-muted-foreground mb-6">Review before sending to {customer.name}</p>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/20">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Purchased Items</p>
              <div className="space-y-2">
                {items.filter((i) => i.name).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.name} <span className="text-muted-foreground">× {item.qty}</span></span>
                    <span className="text-sm font-medium font-mono-data">{formatCurrency(item.qty * item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium font-mono-data">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Discount (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={discount || ""}
                  placeholder="0"
                  onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-24 px-2.5 py-1.5 border border-border rounded-lg text-sm text-right font-mono-data bg-background text-foreground"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  GST (9%)
                  <button
                    onClick={() => setTaxEnabled((t) => !t)}
                    className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 ${taxEnabled ? "bg-accent" : "bg-border"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform mx-0.5 ${taxEnabled ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </label>
                <span className={`text-sm font-mono-data ${taxEnabled ? "text-foreground" : "text-muted-foreground line-through"}`}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-base font-semibold font-display">Grand Total</span>
                <span className="text-2xl font-bold font-mono-data text-foreground">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(2)} className="px-5 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
              Back
            </button>
            <button
              onClick={generate}
              className="flex-1 py-3 bg-[#25d366] text-white rounded-xl font-semibold font-display text-sm flex items-center justify-center gap-2 hover:bg-[#1db954] transition-colors shadow-sm"
            >
              <Icon.whatsapp /> Generate & Send E-Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ bills, onNewBill, onViewBill }: { bills: Bill[]; onNewBill: () => void; onViewBill: (b: Bill) => void }) {
  const today = bills.filter((b) => {
    const now = new Date();
    const d = b.date;
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const todaySales = today.reduce((s, b) => s + b.total, 0);
  const uniqueCustomers = new Set(bills.map((b) => b.customer.phone)).size;

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold font-display text-foreground flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-70"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            Good morning
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{formatDate(new Date())} · Sharma's Café & Kitchen</p>
        </div>
        <button
          onClick={onNewBill}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium font-display hover:bg-indigo-600 transition-colors shadow-sm"
        >
          <Icon.plus /> New Bill
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Sales" value={formatCurrency(todaySales)} sub={`${today.length} transactions`} icon={<Icon.trending />} />
        <StatCard label="Total Bills" value={String(bills.length)} sub="All time" icon={<Icon.bill />} />
        <StatCard label="Customers" value={String(uniqueCustomers)} sub="Unique visitors" icon={<Icon.users />} />
        <StatCard label="Avg. Bill" value={bills.length ? formatCurrency(Math.round(bills.reduce((s, b) => s + b.total, 0) / bills.length)) : "—"} sub="Per transaction" icon={<Icon.tag />} />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold font-display">Recent Transactions</h2>
          <span className="text-xs text-muted-foreground">{bills.length} total</span>
        </div>
        <div className="divide-y divide-border">
          {bills.slice(0, 8).map((bill) => (
            <button
              key={bill.id}
              onClick={() => onViewBill(bill)}
              className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                <Icon.bill />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{bill.customer.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{bill.billNumber} · {formatTime(bill.date)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold font-mono-data text-foreground">{formatCurrency(bill.total)}</p>
                <Badge variant={bill.status === "paid" ? "success" : "warning"}>{bill.status}</Badge>
              </div>
              <div className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                <Icon.arrowRight />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 p-5 border border-dashed border-border rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-sm font-medium font-display">Ready to bill your next customer?</p>
          <p className="text-xs text-muted-foreground mt-0.5">Create a bill in under 30 seconds</p>
        </div>
        <button
          onClick={onNewBill}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          <Icon.plus /> New Bill
        </button>
      </div>
    </div>
  );
}

// ─── Bills List ───────────────────────────────────────────────────────────────

function BillsList({ bills, onViewBill }: { bills: Bill[]; onViewBill: (b: Bill) => void }) {
  const [search, setSearch] = useState("");
  const filtered = bills.filter(
    (b) =>
      b.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      b.billNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold font-display">Bills & Transactions</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{bills.length} total bills</p>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer or bill number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-card text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border">
          <span className="col-span-3 text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Bill #</span>
          <span className="col-span-3 text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Customer</span>
          <span className="col-span-2 text-[11px] text-muted-foreground uppercase tracking-wider font-medium hidden sm:block">Date</span>
          <span className="col-span-2 text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-right">Amount</span>
          <span className="col-span-2 text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-right">Status</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((bill) => (
            <button
              key={bill.id}
              onClick={() => onViewBill(bill)}
              className="w-full grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/30 transition-colors text-left items-center group"
            >
              <span className="col-span-3 text-sm font-medium font-mono-data text-foreground">{bill.billNumber}</span>
              <span className="col-span-3 text-sm text-foreground">{bill.customer.name}</span>
              <span className="col-span-2 text-sm text-muted-foreground hidden sm:block">{formatDate(bill.date)}</span>
              <span className="col-span-2 text-sm font-semibold font-mono-data text-right text-foreground">{formatCurrency(bill.total)}</span>
              <span className="col-span-2 text-right">
                <Badge variant={bill.status === "paid" ? "success" : "warning"}>{bill.status}</Badge>
              </span>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">No bills found</div>
        )}
      </div>
    </div>
  );
}

// ─── Customers ────────────────────────────────────────────────────────────────

function CustomersView({ bills }: { bills: Bill[] }) {
  const customerMap = new Map<string, Customer>();
  bills.forEach((b) => {
    const key = b.customer.phone;
    if (customerMap.has(key)) {
      const c = customerMap.get(key)!;
      c.totalBills++;
      c.totalSpent += b.total;
      if (b.date > c.lastVisit) c.lastVisit = b.date;
    } else {
      customerMap.set(key, {
        name: b.customer.name,
        phone: b.customer.phone,
        totalBills: 1,
        totalSpent: b.total,
        lastVisit: b.date,
      });
    }
  });
  const customers = Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold font-display">Customers</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{customers.length} unique customers</p>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border">
          <span className="col-span-4 text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Customer</span>
          <span className="col-span-3 text-[11px] text-muted-foreground uppercase tracking-wider font-medium hidden sm:block">Last Visit</span>
          <span className="col-span-2 text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-center">Bills</span>
          <span className="col-span-3 text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-right">Total Spent</span>
        </div>
        <div className="divide-y divide-border">
          {customers.map((c) => (
            <div key={c.phone} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold font-display text-muted-foreground flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground font-mono-data">+91 {c.phone}</p>
                </div>
              </div>
              <span className="col-span-3 text-sm text-muted-foreground hidden sm:block">{formatDate(c.lastVisit)}</span>
              <span className="col-span-2 text-sm text-center font-mono-data text-foreground">{c.totalBills}</span>
              <span className="col-span-3 text-sm font-semibold font-mono-data text-right text-foreground">{formatCurrency(c.totalSpent)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Analytics ───────────────────────────────────────────────────────────────

function Analytics({ bills }: { bills: Bill[] }) {
  const total = bills.reduce((s, b) => s + b.total, 0);
  const avg = bills.length ? Math.round(total / bills.length) : 0;
  const paid = bills.filter((b) => b.status === "paid");

  const itemMap = new Map<string, number>();
  bills.forEach((b) => b.items.forEach((i) => itemMap.set(i.name, (itemMap.get(i.name) || 0) + i.qty)));
  const topItems = Array.from(itemMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxQty = topItems[0]?.[1] ?? 1;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold font-display">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Overview of your business performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Revenue" value={formatCurrency(total)} sub="All time" icon={<Icon.trending />} />
        <StatCard label="Avg. Bill Value" value={formatCurrency(avg)} sub="Per transaction" icon={<Icon.tag />} />
        <StatCard label="Paid Bills" value={`${paid.length}/${bills.length}`} sub={`${Math.round((paid.length / Math.max(bills.length, 1)) * 100)}% collected`} icon={<Icon.check />} />
      </div>

      {topItems.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-semibold font-display mb-5">Top Items by Volume</h2>
          <div className="space-y-4">
            {topItems.map(([name, qty]) => (
              <div key={name} className="flex items-center gap-4">
                <span className="text-sm text-foreground w-36 truncate">{name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(qty / maxQty) * 100}%` }} />
                </div>
                <span className="text-sm font-mono-data text-muted-foreground w-8 text-right">{qty}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Business Profile ─────────────────────────────────────────────────────────

function BusinessProfile() {
  return (
    <div className="animate-fade-in max-w-xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold font-display">Business Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your shop details appear on every bill</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
        {[
          { label: "Business Name", value: "Sharma's Café & Kitchen", type: "text" },
          { label: "Owner Name", value: "Rahul Sharma", type: "text" },
          { label: "Phone Number", value: "+91 98765 43210", type: "tel" },
          { label: "Email", value: "sharma.cafe@gmail.com", type: "email" },
          { label: "Address", value: "12, HSR Layout, Sector 1, Bangalore – 560102", type: "text" },
          { label: "GSTIN (optional)", value: "29AABCS1429B1ZB", type: "text" },
        ].map(({ label, value, type }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>
            <input type={type} defaultValue={value} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground" />
          </div>
        ))}
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium font-display hover:bg-indigo-600 transition-colors mt-2">
          Save Changes
        </button>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsView() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="animate-fade-in max-w-xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold font-display">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your app preferences</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold font-display">Appearance</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Choose how Business360 looks on your device</p>
        </div>

        <div className="p-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Theme</p>
          <div className="grid grid-cols-2 gap-3">
            {/* Light theme option */}
            <button
              onClick={() => setTheme("light")}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                theme === "light"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {/* Preview swatch */}
              <div className="w-full h-20 rounded-lg mb-3 overflow-hidden border border-border/60" style={{ background: "#f5f6fa" }}>
                <div className="flex h-full">
                  <div className="w-1/3 h-full" style={{ background: "#ffffff", borderRight: "1px solid #e2e4ef" }} />
                  <div className="flex-1 p-2 space-y-1.5">
                    <div className="h-2 rounded-full w-3/4" style={{ background: "#e2e4ef" }} />
                    <div className="h-2 rounded-full w-1/2" style={{ background: "#e2e4ef" }} />
                    <div className="h-2 rounded-full w-2/3" style={{ background: "#e2e4ef" }} />
                    <div className="mt-2 h-5 rounded-md w-full" style={{ background: "#4f46e5" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold font-display text-foreground flex items-center gap-1.5">
                    <Icon.sun /> Light
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Clean & bright</p>
                </div>
                {theme === "light" && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>

            {/* Dark theme option */}
            <button
              onClick={() => setTheme("dark")}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                theme === "dark"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {/* Preview swatch */}
              <div className="w-full h-20 rounded-lg mb-3 overflow-hidden border border-border/60" style={{ background: "#070c1a" }}>
                <div className="flex h-full">
                  <div className="w-1/3 h-full" style={{ background: "#0d1226", borderRight: "1px solid #1a2244" }} />
                  <div className="flex-1 p-2 space-y-1.5">
                    <div className="h-2 rounded-full w-3/4" style={{ background: "#1a2244" }} />
                    <div className="h-2 rounded-full w-1/2" style={{ background: "#1a2244" }} />
                    <div className="h-2 rounded-full w-2/3" style={{ background: "#1a2244" }} />
                    <div className="mt-2 h-5 rounded-md w-full" style={{ background: "#6366f1" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold font-display text-foreground flex items-center gap-1.5">
                    <Icon.moon /> Dark
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Deep indigo</p>
                </div>
                {theme === "dark" && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

type View = "dashboard" | "new-bill" | "bills" | "customers" | "analytics" | "profile" | "settings" | "invoice";

const NAV = [
  { id: "dashboard" as View, label: "Dashboard", icon: Icon.dashboard },
  { id: "new-bill" as View, label: "New Bill", icon: Icon.plus },
  { id: "bills" as View, label: "Bills & Transactions", icon: Icon.bill },
  { id: "customers" as View, label: "Customers", icon: Icon.users },
  { id: "analytics" as View, label: "Analytics", icon: Icon.chart },
];

const NAV_BOTTOM = [
  { id: "profile" as View, label: "Business Profile", icon: Icon.store },
  { id: "settings" as View, label: "Settings", icon: Icon.settings },
];

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ${className}`}
    >
      <span className="w-4 h-4 flex-shrink-0">
        {isDark ? <Icon.sun /> : <Icon.moon />}
      </span>
      <span className="text-xs font-medium hidden sm:block">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

function Sidebar({ active, onNav, onClose, onHome }: {
  active: View; onNav: (v: View) => void; onClose?: () => void; onHome?: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="flex flex-col h-full bg-card border-r border-border w-60 flex-shrink-0">
      <div className="px-5 py-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-sm font-bold font-display text-foreground">Business360</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 lg:hidden">
            <Icon.x />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ id, label, icon: Ic }) => (
          <button
            key={id}
            onClick={() => { onNav(id); onClose?.(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              active === id
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            } ${id === "new-bill" ? "mt-4 mb-1 border border-dashed border-border hover:border-primary/40 text-foreground font-medium" : ""}`}
          >
            <Ic />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-0.5">
        {NAV_BOTTOM.map(({ id, label, icon: Ic }) => (
          <button
            key={id}
            onClick={() => { onNav(id); onClose?.(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              active === id ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Ic />
            {label}
          </button>
        ))}
        <div className="mt-3 px-3 py-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">R</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground truncate">Rahul Sharma</p>
              <p className="text-[10px] text-muted-foreground">Free Plan</p>
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border/60 transition-colors flex-shrink-0"
            >
              {theme === "light" ? <Icon.moon /> : <Icon.sun />}
            </button>
          </div>
        </div>
        {onHome && (
          <button
            onClick={onHome}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Home
          </button>
        )}
      </div>
    </aside>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<"landing" | "dashboard">("landing");
  const [theme, setTheme] = useState<Theme>("light");
  const [view, setView] = useState<View>("dashboard");
  const [bills, setBills] = useState<Bill[]>(SEED_BILLS);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSaveBill = (bill: Bill) => setBills((prev) => [bill, ...prev]);

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
    setView("invoice");
  };

  const navigate = (v: View) => {
    setView(v);
    if (v !== "invoice") setSelectedBill(null);
  };

  const renderContent = () => {
    if (view === "invoice" && selectedBill) {
      return <InvoiceView bill={selectedBill} onBack={() => setView("bills")} />;
    }
    switch (view) {
      case "dashboard": return <Dashboard bills={bills} onNewBill={() => navigate("new-bill")} onViewBill={handleViewBill} />;
      case "new-bill": return <NewBill bills={bills} onSave={handleSaveBill} />;
      case "bills": return <BillsList bills={bills} onViewBill={handleViewBill} />;
      case "customers": return <CustomersView bills={bills} />;
      case "analytics": return <Analytics bills={bills} />;
      case "profile": return <BusinessProfile />;
      case "settings": return <SettingsView />;
      default: return null;
    }
  };

  if (page === "landing") {
    return <LandingPage onEnter={() => setPage("dashboard")} />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="flex h-screen overflow-hidden bg-background" data-theme={theme}>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 lg:relative lg:flex lg:z-auto transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <Sidebar active={view} onNav={navigate} onClose={() => setSidebarOpen(false)} onHome={() => setPage("landing")} />
        </div>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Desktop top bar */}
          <div className="hidden lg:flex items-center justify-end px-8 py-3 border-b border-border bg-card">
            <ThemeToggle />
          </div>

          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
            <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
              <Icon.menu />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="text-sm font-bold font-display">Business360</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => navigate("new-bill")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium"
              >
                <Icon.plus /> New Bill
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 lg:px-8 lg:py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
