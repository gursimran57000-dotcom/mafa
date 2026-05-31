import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Gallery", "Testimonials", "Contact"];

const SERVICES = [
  { icon: "⚽", title: "Elite Football Coaching", desc: "Professional training in ball control, passing, shooting, and tactical positioning for all age groups.", accent: "#16a34a" },
  { icon: "🏃", title: "Fitness & Conditioning", desc: "Sport-specific fitness programs including speed, agility, endurance, and strength training.", accent: "#2563eb" },
  { icon: "🧠", title: "Tactical Training", desc: "Game intelligence covering formations, positioning, pressing, and set-piece strategy.", accent: "#7c3aed" },
  { icon: "🧒", title: "Youth Development", desc: "Age-appropriate programs for children from age 6, building a lifelong love for the game.", accent: "#ea580c" },
  { icon: "🏆", title: "Competitive Tournaments", desc: "Regular in-house tournaments and participation in district & state-level competitions.", accent: "#ca8a04" },
  { icon: "🎓", title: "Trial & Scholarship", desc: "Talent identification and scholarship opportunities for exceptional players with potential.", accent: "#0891b2" },
];

const TESTIMONIALS = [
  { name: "Bhagvanjee Jha", role: "Academy Member", review: "I joined many academies but MAFA is too good. If you are interested in playing football, go there — the coach is excellent. Best academy in Bathinda!", stars: 5, initial: "BJ", color: "#16a34a" },
  { name: "Gurpreet Kaur", role: "Student", review: "My experience at MAFA Football Academy was very good. I learned to play well and our coach helped me shoot and dribble. Very happy to join MAFA!", stars: 5, initial: "GK", color: "#2563eb" },
  { name: "Harshdeep", role: "Academy Member", review: "This is the best academy ever. If you are interested in football and want to learn skills, MAFA is the place to go. Highly recommend!", stars: 5, initial: "H", color: "#7c3aed" },
  { name: "Amartesh Singh", role: "Coach", review: "At MAFA we focus on building complete footballers — technically sound, physically fit, and mentally sharp. Our students' progress speaks for itself.", stars: 5, initial: "AS", color: "#ea580c" },
];

const GALLERY_ITEMS = [
  { label: "Training Session", emoji: "⚽", bg: "#dcfce7", border: "#86efac" },
  { label: "Match Day", emoji: "🏆", bg: "#dbeafe", border: "#93c5fd" },
  { label: "Youth Program", emoji: "🧒", bg: "#fef3c7", border: "#fcd34d" },
  { label: "Team Practice", emoji: "🏃", bg: "#ede9fe", border: "#c4b5fd" },
  { label: "Skill Drills", emoji: "🎯", bg: "#ffedd5", border: "#fdba74" },
  { label: "Tournament", emoji: "🥇", bg: "#cffafe", border: "#67e8f9" },
];

const FAQS = [
  { q: "What age groups do you accept?", a: "We welcome players from age 6 and above. We have separate batches for juniors (6–12), teens (13–17), and adults (18+)." },
  { q: "What are the training timings?", a: "We train from 6:00 AM to 8:00 AM in the morning and 4:00 PM to 7:00 PM in the evening, Monday through Saturday." },
  { q: "Do I need prior experience to join?", a: "No prior experience is needed. We welcome complete beginners as well as experienced players looking to improve." },
  { q: "Is equipment provided?", a: "Cones, balls, and bibs are provided during training. Students are required to bring their own boots and sportswear." },
  { q: "How can I enroll?", a: "Visit us at Lal Singh Nagar, Bathinda or call/WhatsApp us at 082646 84992 to schedule a free trial session." },
];

function StarRating({ count }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: "15px" }}>★</span>
      ))}
    </div>
  );
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

export default function MAFAWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "", batch: "" });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const GREEN = "#16a34a";
  const GOLD = "#f59e0b";

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#ffffff", color: "#111827", overflowX: "hidden" }}>

      {/* WhatsApp Floating */}
      <a href="https://wa.me/918264684992?text=Hi%2C%20I%27m%20interested%20in%20joining%20MAFA" target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999, background: "#25d366", borderRadius: "50%", width: "58px", height: "58px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,211,102,0.45)", textDecoration: "none", fontSize: "28px" }}>
        💬
      </a>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "none",
        transition: "all 0.3s ease",
        padding: "0 5%"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: `linear-gradient(135deg, ${GREEN}, ${GOLD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>⚽</div>
            <div>
              <div style={{ fontWeight: "800", fontSize: "17px", letterSpacing: "0.5px", color: scrolled ? "#111827" : "#fff" }}>MAFA</div>
              <div style={{ fontSize: "9px", color: scrolled ? "#6b7280" : "rgba(255,255,255,0.7)", letterSpacing: "2px", fontWeight: "600" }}>MALWA APEX FOOTBALL</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="desk-nav">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{ background: "none", border: "none", color: scrolled ? "#374151" : "rgba(255,255,255,0.9)", cursor: "pointer", padding: "8px 14px", fontSize: "14px", fontFamily: "inherit", borderRadius: "8px", fontWeight: "500", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "#f3f4f6" : "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
                {link}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ background: GREEN, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "700", fontFamily: "inherit", marginLeft: "8px" }}>
              Join Now →
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="ham-btn"
            style={{ display: "none", background: "none", border: `1.5px solid ${scrolled ? "#d1d5db" : "rgba(255,255,255,0.4)"}`, color: scrolled ? "#374151" : "#fff", padding: "7px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "18px" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "12px 5%", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "#374151", cursor: "pointer", padding: "13px 0", fontSize: "15px", fontFamily: "inherit", fontWeight: "500", borderBottom: "1px solid #f3f4f6" }}>
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Background image-like gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)" }} />
        
        {/* Subtle pitch overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="700" fill="none" stroke="#fff" strokeWidth="3"/>
            <circle cx="600" cy="350" r="100" fill="none" stroke="#fff" strokeWidth="3"/>
            <line x1="600" y1="0" x2="600" y2="700" stroke="#fff" strokeWidth="3"/>
            <rect x="0" y="200" width="160" height="300" fill="none" stroke="#fff" strokeWidth="3"/>
            <rect x="1040" y="200" width="160" height="300" fill="none" stroke="#fff" strokeWidth="3"/>
          </svg>
        </div>

        {/* Light overlay at bottom for text contrast */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }}/>

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "100px 5% 60px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "6px 16px", marginBottom: "28px" }}>
                <span style={{ color: GOLD }}>★★★★★</span>
                <span style={{ fontSize: "13px", color: "#fff", fontWeight: "500" }}>4.9 · 58 Reviews · Bathinda #1</span>
              </div>

              <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: "900", lineHeight: "1.05", margin: "0 0 20px", color: "#fff", letterSpacing: "-1px" }}>
                Train Like<br/>
                <span style={{ color: GOLD }}>Champions.</span><br/>
                Play Like<br/>
                <span style={{ color: "#a7f3d0" }}>Legends.</span>
              </h1>

              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.82)", lineHeight: "1.75", marginBottom: "36px", maxWidth: "480px" }}>
                Bathinda's most trusted football academy at Lal Singh Nagar. Expert coaching for all ages, from first kick to competitive play.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("Contact")}
                  style={{ background: "#fff", color: GREEN, border: "none", padding: "15px 32px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "800", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                  ⚽ Free Trial Session
                </button>
                <a href="https://wa.me/918264684992" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25d366", color: "#fff", border: "none", padding: "15px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: "700", textDecoration: "none", fontFamily: "inherit" }}>
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right — Stats cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { val: "4.9★", label: "Google Rating", icon: "⭐", bg: "#fff" },
                { val: "58+", label: "Happy Reviews", icon: "💬", bg: "#fff" },
                { val: "All Ages", label: "Welcome Here", icon: "👶", bg: "#fff" },
                { val: "6 AM", label: "Opens Daily", icon: "⏰", bg: "#fff" },
              ].map(item => (
                <div key={item.label} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "14px", padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>{item.val}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px", fontWeight: "500" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "96px 5%", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
            <FadeIn>
              <div>
                <span style={{ display: "inline-block", background: "#dcfce7", color: GREEN, fontSize: "12px", fontWeight: "700", letterSpacing: "2px", padding: "6px 14px", borderRadius: "999px", marginBottom: "20px" }}>WHO WE ARE</span>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", margin: "0 0 20px", lineHeight: "1.15", color: "#111827" }}>
                  Bathinda's Premier<br /><span style={{ color: GREEN }}>Football Academy</span>
                </h2>
                <p style={{ color: "#6b7280", lineHeight: "1.8", marginBottom: "20px", fontSize: "16px" }}>
                  MAFA — Malwa Apex Football Academy — is located in the heart of Lal Singh Nagar, Bathinda. We are passionate about developing technically sound, physically fit, and mentally resilient footballers at every level.
                </p>
                <p style={{ color: "#6b7280", lineHeight: "1.8", marginBottom: "32px", fontSize: "16px" }}>
                  From grassroots youth programs to competitive-level training, our qualified coaches provide structured sessions tailored for every stage. Proud to hold a 4.9-star rating on Google with over 58 reviews.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { icon: "📍", title: "Location", val: "Lal Singh Nagar, Bathinda" },
                    { icon: "📞", title: "Phone", val: "082646 84992" },
                    { icon: "⏰", title: "Hours", val: "6 AM–8 AM · 4 PM–7 PM" },
                    { icon: "📅", title: "Days", val: "Mon – Saturday" },
                  ].map(item => (
                    <div key={item.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px 18px" }}>
                      <div style={{ fontSize: "18px", marginBottom: "6px" }}>{item.icon}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "600", letterSpacing: "1px", marginBottom: "2px" }}>{item.title}</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ position: "relative" }}>
                {/* Big rating card */}
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", textAlign: "center" }}>
                  <div style={{ fontSize: "80px", marginBottom: "8px" }}>⚽</div>
                  <div style={{ fontSize: "56px", fontWeight: "900", color: "#111827", lineHeight: 1 }}>4.9</div>
                  <div style={{ color: GOLD, fontSize: "28px", margin: "8px 0" }}>★★★★★</div>
                  <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "32px" }}>Based on 58 Google Reviews</div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[["🏆", "Champions"], ["👟", "All Ages"], ["📍", "Bathinda"], ["⏰", "Since Day 1"]].map(([icon, label]) => (
                      <div key={label} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: "22px" }}>{icon}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", fontWeight: "500" }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Floating badge */}
                  <div style={{ position: "absolute", top: "-16px", right: "24px", background: GREEN, color: "#fff", fontSize: "12px", fontWeight: "700", padding: "8px 16px", borderRadius: "999px", boxShadow: "0 4px 12px rgba(22,163,74,0.4)" }}>
                    Bathinda's Best ⚽
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "96px 5%", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ display: "inline-block", background: "#dcfce7", color: GREEN, fontSize: "12px", fontWeight: "700", letterSpacing: "2px", padding: "6px 14px", borderRadius: "999px", marginBottom: "16px" }}>TRAINING PROGRAMS</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", margin: "0 0 12px", color: "#111827" }}>
              Everything You Need to <span style={{ color: GREEN }}>Level Up</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>Professional programs designed for every age and skill level</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.07}>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", transition: "all 0.25s", cursor: "default", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = s.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e5e7eb"; }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: `${s.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "18px" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px", color: "#111827" }}>{s.title}</h3>
                  <p style={{ color: "#6b7280", lineHeight: "1.65", fontSize: "14px", margin: 0 }}>{s.desc}</p>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: s.accent, opacity: 0, transition: "opacity 0.25s" }} className="card-bar"/>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "96px 5%", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ display: "inline-block", background: "#dbeafe", color: "#2563eb", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", padding: "6px 14px", borderRadius: "999px", marginBottom: "16px" }}>LIFE AT MAFA</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", margin: 0, color: "#111827" }}>
              Our Ground & <span style={{ color: "#2563eb" }}>Sessions</span>
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {GALLERY_ITEMS.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.07}>
                <div style={{ background: item.bg, border: `1.5px solid ${item.border}`, borderRadius: "16px", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all 0.25s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "44px", marginBottom: "10px" }}>{item.emoji}</div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151" }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "96px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ display: "inline-block", background: "#fef3c7", color: "#92400e", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", padding: "6px 14px", borderRadius: "999px", marginBottom: "16px" }}>PLAYER REVIEWS</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", margin: "0 0 8px", color: "#111827" }}>
              Real Words from Real <span style={{ color: GOLD }}>Players</span>
            </h2>
            <p style={{ color: "#6b7280" }}>4.9 stars from 58 verified Google reviews</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", gap: "16px", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = t.color; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e5e7eb"; }}>
                  <StarRating count={t.stars} />
                  <p style={{ color: "#374151", lineHeight: "1.7", fontSize: "15px", margin: 0, flex: 1 }}>"{t.review}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "#fff", flexShrink: 0 }}>{t.initial}</div>
                    <div>
                      <div style={{ fontWeight: "700", color: "#111827", fontSize: "14px" }}>{t.name}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af" }}>{t.role}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: "11px", color: "#9ca3af", background: "#f3f4f6", padding: "3px 8px", borderRadius: "999px" }}>Google</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 5%", background: "#f9fafb" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ display: "inline-block", background: "#ede9fe", color: "#7c3aed", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", padding: "6px 14px", borderRadius: "999px", marginBottom: "16px" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", margin: 0, color: "#111827" }}>
              Frequently Asked <span style={{ color: "#7c3aed" }}>Questions</span>
            </h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ background: "#fff", border: `1.5px solid ${activeTab === i ? "#7c3aed" : "#e5e7eb"}`, borderRadius: "14px", overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button onClick={() => setActiveTab(activeTab === i ? null : i)}
                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", color: "#111827", padding: "20px 22px", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit" }}>
                    {faq.q}
                    <span style={{ color: activeTab === i ? "#7c3aed" : "#9ca3af", fontSize: "20px", transition: "transform 0.2s", transform: activeTab === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                  </button>
                  {activeTab === i && (
                    <div style={{ padding: "0 22px 20px", color: "#6b7280", lineHeight: "1.75", fontSize: "14px" }}>{faq.a}</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "96px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ display: "inline-block", background: "#dcfce7", color: GREEN, fontSize: "12px", fontWeight: "700", letterSpacing: "2px", padding: "6px 14px", borderRadius: "999px", marginBottom: "16px" }}>ENROLL TODAY</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", margin: "0 0 10px", color: "#111827" }}>
              Book Your <span style={{ color: GREEN }}>Free Trial</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px" }}>No commitment. Just show up and see the difference.</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            {/* Info */}
            <FadeIn>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { icon: "📍", title: "Address", val: "Lal Singh Nagar, Bathinda, Punjab 151001" },
                  { icon: "📞", title: "Phone / WhatsApp", val: "082646 84992" },
                  { icon: "⏰", title: "Morning Batch", val: "6:00 AM – 8:00 AM" },
                  { icon: "🌆", title: "Evening Batch", val: "4:00 PM – 7:00 PM" },
                  { icon: "📅", title: "Working Days", val: "Monday – Saturday" },
                ].map(item => (
                  <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "16px 18px", borderRadius: "12px" }}>
                    <div style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "700", letterSpacing: "1px", marginBottom: "2px" }}>{item.title}</div>
                      <div style={{ color: "#111827", fontWeight: "600", fontSize: "14px" }}>{item.val}</div>
                    </div>
                  </div>
                ))}

                {/* Map */}
                <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e5e7eb", height: "210px", marginTop: "4px" }}>
                  <iframe title="MAFA Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.6!2d74.9455!3d30.2071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917c7a8a8a8a8a8%3A0x1234!2sLal%20Singh%20Nagar%2C%20Bathinda!5e0!3m2!1sen!2sin!4v1680000000000"
                    width="100%" height="210" style={{ border: 0 }} allowFullScreen loading="lazy"/>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.15}>
              {formSent ? (
                <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: "18px", padding: "60px 40px", textAlign: "center" }}>
                  <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "10px", color: "#111827" }}>We'll be in touch soon!</h3>
                  <p style={{ color: "#6b7280", marginBottom: "24px" }}>Our coach will call you within 24 hours to set up your free trial.</p>
                  <a href="https://wa.me/918264684992?text=Hi%2C%20I%20just%20submitted%20a%20trial%20request" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "13px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>
                    💬 WhatsApp Us Now
                  </a>
                </div>
              ) : (
                <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "36px" }}>
                  <h3 style={{ margin: "0 0 26px", fontSize: "20px", fontWeight: "800", color: "#111827" }}>Register for Free Trial</h3>

                  {[
                    { id: "name", label: "Full Name *", type: "text", placeholder: "Your full name", req: true },
                    { id: "phone", label: "Phone Number *", type: "tel", placeholder: "Mobile number", req: true },
                    { id: "email", label: "Email (optional)", type: "email", placeholder: "your@email.com", req: false },
                  ].map(f => (
                    <div key={f.id} style={{ marginBottom: "18px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required={f.req}
                        value={formData[f.id]} onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                        style={{ width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", color: "#111827", fontSize: "15px", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
                        onFocus={e => e.target.style.borderColor = GREEN}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}/>
                    </div>
                  ))}

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Preferred Batch</label>
                    <select value={formData.batch} onChange={e => setFormData({ ...formData, batch: e.target.value })}
                      style={{ width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", color: "#111827", fontSize: "15px", outline: "none", fontFamily: "inherit" }}
                      onFocus={e => e.target.style.borderColor = GREEN}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}>
                      <option value="">Select a batch time</option>
                      <option>Morning (6:00 AM – 8:00 AM)</option>
                      <option>Evening (4:00 PM – 7:00 PM)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Message (optional)</label>
                    <textarea rows={3} placeholder="Any questions or notes?" value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", color: "#111827", fontSize: "15px", outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                      onFocus={e => e.target.style.borderColor = GREEN}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}/>
                  </div>

                  <button onClick={e => { e.preventDefault(); setFormSent(true); }}
                    style={{ width: "100%", background: GREEN, color: "#fff", border: "none", padding: "15px", borderRadius: "10px", fontSize: "15px", fontWeight: "800", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(22,163,74,0.35)" }}>
                    ⚽ Book My Free Trial
                  </button>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111827", color: "#d1d5db", padding: "60px 5% 28px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: `linear-gradient(135deg, ${GREEN}, ${GOLD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>⚽</div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "17px", color: "#fff" }}>MAFA</div>
                  <div style={{ fontSize: "9px", color: "#6b7280", letterSpacing: "2px" }}>MALWA APEX FOOTBALL ACADEMY</div>
                </div>
              </div>
              <p style={{ color: "#9ca3af", lineHeight: "1.7", fontSize: "14px", marginBottom: "20px" }}>
                Bathinda's most trusted football academy. Developing champions one player at a time.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                  <div key={i} style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#1f2937", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px" }}>{icon}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "18px", fontSize: "15px" }}>Quick Links</h4>
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link)}
                  style={{ display: "block", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: "6px 0", fontSize: "14px", fontFamily: "inherit", textAlign: "left", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}>
                  {link}
                </button>
              ))}
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "18px", fontSize: "15px" }}>Contact Us</h4>
              {[["📍", "Lal Singh Nagar, Bathinda 151001"], ["📞", "082646 84992"], ["⏰", "Mon–Sat · 6AM–8AM & 4PM–7PM"]].map(([icon, val]) => (
                <div key={val} style={{ display: "flex", gap: "10px", marginBottom: "14px", fontSize: "13px", color: "#9ca3af", alignItems: "flex-start" }}>
                  <span>{icon}</span><span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #1f2937", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>© 2024 MAFA — Malwa Apex Football Academy, Bathinda. All rights reserved.</p>
            <div style={{ color: "#6b7280", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: GOLD }}>★★★★★</span> 4.9 / 5 on Google
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .ham-btn { display: block !important; }
        }
        * { box-sizing: border-box; }
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"],
          section > div > div[style*="grid-template-columns: 2fr 1fr 1fr"],
          footer > div > div[style*="grid-template-columns: 2fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
