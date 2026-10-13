import { useEffect, useRef, useState } from "react";
import { person, company } from "./data.js";
import { saveContact } from "./vcard.js";

/* ---------- icons ---------- */
const I = ({ children, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const PhoneIcon = () => (
  <I>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </I>
);
const MailIcon = () => (
  <I>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </I>
);
const ChatIcon = () => (
  <I>
    <path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12Z" />
  </I>
);
const PinIcon = () => (
  <I>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </I>
);
const GlobeIcon = () => (
  <I>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </I>
);
const LinkedinIcon = () => (
  <I>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 11v5M8 8v.01M12 16v-5m0 2.5c0-1.4 1-2.5 2.3-2.5S16.5 12 16.5 13.5V16" />
  </I>
);
const GithubIcon = () => (
  <I>
    <path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.700-.3 5.500-1.300 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.300 4.300 0 0 0-.1-3.200s-1-.3-3.400 1.300a11.700 11.700 0 0 0-6.200 0C6.300 2.900 5.300 3.200 5.300 3.200a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 3.900 9.600c0 4.700 2.800 5.700 5.500 6a2.800 2.800 0 0 0-.8 2.200V21" />
  </I>
);
const UserPlusIcon = () => (
  <I size={22}>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" />
  </I>
);
const ShareIcon = () => (
  <I>
    <path d="M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
  </I>
);
const ArrowIcon = () => (
  <I size={16}>
    <path d="M7 17 17 7M8 7h9v9" />
  </I>
);
const CheckIcon = () => (
  <I size={18}>
    <path d="m5 12.500 4.500 4.500L19 7" />
  </I>
);

/* ---------- small pieces ---------- */
function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="avatar">
      <span className="ring ring-1" />
      <span className="ring ring-2" />
      <span className="ring ring-3" />
      <div className="avatar-core">
        {failed ? (
          <span className="monogram">AP</span>
        ) : (
          <img
            src={person.photo}
            alt={person.fullName}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

function Row({ icon, label, value, href, external }) {
  return (
    <a
      className="row"
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="row-icon">{icon}</span>
      <span className="row-text">
        <small>{label}</small>
        <b>{value}</b>
      </span>
      <span className="row-go">
        <ArrowIcon />
      </span>
    </a>
  );
}

/* ---------- tabs ---------- */
function ContactTab() {
  return (
    <div className="stack">
      <Row
        icon={<PhoneIcon />}
        label="Mobile"
        value={person.phoneDisplay}
        href={`tel:${person.phone}`}
      />
      <Row
        icon={<MailIcon />}
        label="Personal email"
        value={person.email}
        href={`mailto:${person.email}`}
      />
      <Row
        icon={<MailIcon />}
        label="Work email"
        value={company.email}
        href={`mailto:${company.email}`}
      />
      <Row
        icon={<GlobeIcon />}
        label="Portfolio"
        value="athithyan.in"
        href={person.personalSite}
        external
      />
      <Row
        icon={<LinkedinIcon />}
        label="LinkedIn"
        value="Athithyan P"
        href={person.linkedin}
        external
      />
      <Row
        icon={<GithubIcon />}
        label="GitHub"
        value="Athithyan00"
        href={person.github}
        external
      />
    </div>
  );
}

function CompanyTab() {
  return (
    <div className="stack">
      <section className="company-hero">
        <div className="logo-chip">
          <img
            src={company.logo}
            alt="Arcnio"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="logo-fallback">Arcnio</span>
        </div>
        <h3>{company.slogan}</h3>
        <p>{company.about}</p>
        <div className="loc">
          <PinIcon /> {company.location}
        </div>
      </section>

      <Row
        icon={<PhoneIcon />}
        label="Company phone"
        value={company.phoneDisplay}
        href={`tel:${company.phone}`}
      />
      <Row
        icon={<MailIcon />}
        label="Company email"
        value={company.email}
        href={`mailto:${company.email}`}
      />

      <ul className="services">
        {company.services.map((s) => (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="noreferrer">
              <span>
                <b>{s.name}</b>
                <small>{s.note}</small>
              </span>
              <ArrowIcon />
            </a>
          </li>
        ))}
      </ul>

      <div className="two">
        <a
          className="btn ghost"
          href={company.website}
          target="_blank"
          rel="noreferrer"
        >
          <GlobeIcon /> Visit website
        </a>
        <a
          className="btn ghost"
          href={company.contactPage}
          target="_blank"
          rel="noreferrer"
        >
          <ChatIcon /> Start a project
        </a>
      </div>
    </div>
  );
}

const TABS = [
  { id: "contact", label: "Contact", view: <ContactTab /> },
  { id: "arcnio", label: "Company", view: <CompanyTab /> },
];

/* ---------- app ---------- */
export default function App() {
  const [tab, setTab] = useState("contact");
  const [toast, setToast] = useState("");
  const cardRef = useRef(null);

  // soft light that follows the pointer across the card (does not touch the cursor)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(flash.t);
    flash.t = setTimeout(() => setToast(""), 2600);
  };

  const onSave = () => {
    saveContact();
    flash("Contact file ready — confirm “Add contact”");
  };

  const onShare = async () => {
    const data = {
      title: `${person.fullName} — ${company.name}`,
      text: `${person.fullName}, ${person.title} at ${company.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        flash("Link copied");
      }
    } catch {
      /* user dismissed the share sheet */
    }
  };

  const active = TABS.find((t) => t.id === tab);

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <main className="shell">
        <div className="card" ref={cardRef}>
          <header className="hero">
            <Avatar />
            <h1>{person.fullName}</h1>
            <p className="role">{person.title}</p>
            <a
              className="company-pill"
              href={company.website}
              target="_blank"
              rel="noreferrer"
            >
              <span className="dot" /> {company.name}
              <small>{company.location.split(",")[0]}</small>
            </a>
            <p className="tagline">{person.tagline}</p>
          </header>

          <div className="actions">
            <button className="btn primary" onClick={onSave}>
              <UserPlusIcon /> Save contact
            </button>
            <div className="quick">
              <a href={`tel:${person.phone}`} aria-label="Call">
                <PhoneIcon />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/${person.phone.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <ChatIcon />
                <span>WhatsApp</span>
              </a>
              <a href={`mailto:${company.email}`} aria-label="Email">
                <MailIcon />
                <span>Email</span>
              </a>
              <button onClick={onShare} aria-label="Share">
                <ShareIcon />
                <span>Share</span>
              </button>
            </div>
          </div>

          <nav className="tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? "on" : ""}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <section className="panel" key={active.id} role="tabpanel">
            {active.view}
          </section>

          <footer className="foot">
            © {new Date().getFullYear()} Athithyan P · Arcnio
          </footer>
        </div>
      </main>

      <div
        className={`toast ${toast ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        <CheckIcon /> {toast}
      </div>
    </>
  );
}
