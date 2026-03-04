import { useState, useMemo, useCallback } from "react";
import { useGitHubPinnedRepos } from "./hooks/use-github-pinned-repos";

const projects = [
  { title: "AZOGCC – State Energy Commission Website", year: "2024", img: "/images/azogcc.png", url: "https://azogcc.az.gov/" },
  { title: "Vehique – AI Car Shopping Platform", year: "2025", img: "/images/vehique.png", url: "https://www.vehique.ai/" },
  { title: "Monthly Records – Spotify Listening History", year: "2026", img: "/images/monthly-records.png", url: "https://monthly-records.vercel.app/" },
  { title: "UC Santa Cruz – Undergraduate Admissions", year: "2024", img: "/images/ucsc-admissions.png", url: "https://admissions.ucsc.edu/" },
];

const experiences = [
  {
    company: "Pleasure Point Digital",
    role: "Founder",
    period: "2025 – Present",
    color: "#2563EB",
    icon: "🏖️",
    url: "https://pleasurepointdigital.com/",
  },
  {
    company: "Charles River Web",
    role: "Developer",
    period: "March 2025 – November 2025",
    color: "#4F46E5",
    icon: "🌃",
  },
  {
    company: "Project Ricochet",
    role: "Developer",
    period: "November 2024 – Present",
    color: "#10B981",
    icon: "🌉",
  },
  {
    company: "Arizona Dept. of Environmental Quality",
    role: "Developer",
    period: "November 2023 – Present",
    color: "#F59E0B",
    icon: "🏜️",
  },
];

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
    ),
    title: "Web Development",
    desc: "Building fast, responsive, and accessible websites with modern frameworks and clean code.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
    ),
    title: "UI/UX Design",
    desc: "Crafting visually compelling interfaces that prioritize user experience using Figma.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
    ),
    title: "React Development",
    desc: "Developing scalable component-based apps using React, Next.js, and TypeScript.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
    ),
    title: "Performance Optimization",
    desc: "Improving load times, Core Web Vitals, and overall performance for web applications.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z" /><path d="M4 12h16" /><path d="M12 4v16" /></svg>
    ),
    title: "API Integration",
    desc: "Connecting front-ends to APIs, authentication, and third-party services.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
    title: "Consulting",
    desc: "Providing technical guidance and architectural reviews for small businesses and growing teams.",
  },
];


function useCaptcha() {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const challenge = useMemo(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, result: a + b };
  }, [isOpen]);

  const prompt = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setAnswer("");
    setError(false);
    setIsOpen(true);
  }, []);

  const verify = useCallback(() => {
    if (parseInt(answer, 10) === challenge.result) {
      setIsOpen(false);
      setError(false);
      window.location.href = "mailto:15brandon51@gmail.com";
    } else {
      setError(true);
    }
  }, [answer, challenge.result]);

  const close = useCallback(() => {
    setIsOpen(false);
    setError(false);
  }, []);

  return { isOpen, answer, setAnswer, error, challenge, prompt, verify, close };
}

export default function App() {
  const { repos: pinnedRepos, isLoading: isLoadingRepos } = useGitHubPinnedRepos(3);
  const captcha = useCaptcha();

  return (
    <div className="bg-[#F2F2F0] min-h-screen text-[#1a1a1a] scroll-smooth" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* HERO (nav is inside so the image extends behind it) */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        {/* NAV */}
        <nav className="relative z-50">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-12">
            <span className="text-white" style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "-0.02em" }}>Hello!</span>
            <div className="hidden md:flex items-center gap-6" style={{ marginRight: "auto", marginLeft: "48px" }}>
              {[
                { label: "About", id: "about" },
                { label: "Projects", id: "projects" },
                { label: "Experience", id: "experience" },
                { label: "Services", id: "services" },
                { label: "Repositories", id: "pinned-repos" },
              ].map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-white/70 hover:text-white transition-colors" style={{ fontSize: "12px" }}>{item.label}</a>
              ))}
            </div>
            <a href="#" onClick={captcha.prompt} className="text-white/70 hover:text-white transition-colors" style={{ fontSize: "12px" }}>15brandon51@gmail.com</a>
          </div>
        </nav>
        <div className="relative max-w-5xl mx-auto px-6 flex items-center" style={{ minHeight: "calc(100vh - 48px)" }}>
          <div className="max-w-lg">
            <h1 className="text-white" style={{ fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
              I'm Brandon,{" "}
              <span style={{ color: "#93bbff" }}>a Full-Stack</span>
              <br />
              <span style={{ color: "#93bbff" }}>Engineer.</span>
            </h1>
            <p className="mt-5 text-white/70 max-w-md" style={{ fontSize: "13px", lineHeight: 1.6 }}>
              UC Santa Cruz CS alum building end-to-end applications, documenting his learning process through{" "}
              <a href="https://www.linkedin.com/in/brandon-corona-bhardwaj/recent-activity/all/" target="_blank" rel="noopener noreferrer" className="text-[#93bbff] hover:underline">blog posts</a>.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#about"
                className="btn-glossy px-5 py-2.5 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  background: "linear-gradient(135deg, #4f8fff 0%, #2563EB 40%, #1a4fd4 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 8px rgba(37,99,235,0.3)",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Talk with me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL BAR */}
      <div className="border-t border-b border-[#e0e0dc]">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            {[
              { label: "Twitter", url: "https://x.com/__brandoncorona" },
              { label: "GitHub", url: "https://github.com/brandon-cor" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/brandon-corona-bhardwaj/" },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-[#1a1a1a] transition-colors" style={{ fontSize: "11px" }}>{s.label}</a>
            ))}
          </div>
          <a href="#projects" className="text-[#888] hover:text-[#1a1a1a] transition-colors flex items-center gap-1" style={{ fontSize: "11px" }}>
            Discover ↓
          </a>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[#999] mb-4" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>/ About</p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p style={{ fontSize: "17px", fontWeight: 500, lineHeight: 1.5, letterSpacing: "-0.02em" }}>
              A full-stack developer and UC Santa Cruz Computer Science graduate, building production software across government, startups, and agencies.
            </p>
            <p className="mt-4 text-[#555]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              From shipping pages that serve <strong>500K+ monthly users</strong> at Arizona DEQ to founding{" "}
              <a href="https://pleasurepointdigital.com/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">Pleasure Point Digital</a>,{" "}
              <span>a digital agency helping businesses establish and grow their online presence.</span>
            </p>
          </div>
          <div className="flex items-center justify-around flex-1">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "15+", label: "Projects Done" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div style={{ fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 700, color: "#2563EB", letterSpacing: "-0.04em", lineHeight: 1 }}>{stat.value}</div>
                <div className="text-[#888] mt-2" style={{ fontSize: "13px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-20 border-t border-[#e0e0dc]">
        <p className="text-[#999] mb-4" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>/ Projects</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", maxWidth: "480px", lineHeight: 1.1 }}>
          Things I've Built
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4">
          {projects.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" className="group">
              <div className="overflow-hidden bg-[#e8e8e4]" style={{ aspectRatio: "16/10" }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span style={{ fontSize: "12px", color: "#555" }} className="group-hover:text-[#2563EB] transition-colors">{p.title}</span>
                <span style={{ fontSize: "11px", color: "#aaa" }}>{p.year}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="bg-[#ebebea] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#999] mb-4" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>/ Experience</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", maxWidth: "440px", lineHeight: 1.1 }}>
            A Proven Track Record
          </h2>
          <div className="mt-10 space-y-4">
            {experiences.map((exp) => (
              <div key={exp.company} className="flex items-center gap-4 bg-[#F2F2F0] px-5 py-4">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 36, height: 36, fontSize: "22px" }}
                >
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: "13px", fontWeight: 600 }}>
                    {exp.role} at{" "}
                    {exp.url ? (
                      <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">{exp.company}</a>
                    ) : exp.company}
                  </div>
                  <div className="text-[#999]" style={{ fontSize: "11px", marginTop: 2 }}>{exp.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-20 border-t border-[#e0e0dc]">
        <p className="text-[#999] mb-4" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>/ Services</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          What can I help you with?
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div key={svc.title} className="bg-[#ebebea] p-5">
              <div className="text-[#2563EB] mb-3">{svc.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: 6 }}>{svc.title}</div>
              <p className="text-[#777]" style={{ fontSize: "12px", lineHeight: 1.6 }}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PINNED REPOS */}
      <section id="pinned-repos" className="bg-[#ebebea] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#999] mb-4" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>/ Open Source</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Pinned Repositories
          </h2>
          <p className="mt-3 text-[#777]" style={{ fontSize: "13px" }}>
            My most recent pinned projects on GitHub, updated live.
          </p>

          {isLoadingRepos ? (
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-[#F2F2F0] p-6 animate-pulse">
                  <div className="h-4 bg-[#ddd] rounded w-3/4 mb-4" />
                  <div className="h-3 bg-[#ddd] rounded w-full mb-2" />
                  <div className="h-3 bg-[#ddd] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : pinnedRepos.length === 0 ? (
            <div className="mt-10 bg-[#F2F2F0] p-8 text-center">
              <p className="text-[#999]" style={{ fontSize: "13px" }}>
                No pinned repositories found. Configure your GitHub token in the .env file.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {pinnedRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F2F2F0] p-6 group hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }} className="group-hover:text-[#2563EB] transition-colors truncate">
                      {repo.name}
                    </span>
                  </div>

                  <p className="text-[#777] mb-4 line-clamp-2" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                    {repo.description || "No description provided."}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    {repo.primaryLanguage && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: repo.primaryLanguage.color }}
                        />
                        <span className="text-[#888]" style={{ fontSize: "11px" }}>
                          {repo.primaryLanguage.name}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[#888]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span style={{ fontSize: "11px" }}>{repo.stargazerCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#888]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14H14V11.2676C13.4022 10.9218 13 10.2754 13 9.53504C13 8.43047 13.8954 7.53504 15 7.53504C16.1046 7.53504 17 8.43047 17 9.53504C17 10.2754 16.5978 10.9218 16 11.2676V14C16 15.1046 15.1046 16 14 16H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.40221 17.6134 8 17.2676V6.73244C7.40221 6.38663 7 5.74028 7 5Z" />
                      </svg>
                      <span style={{ fontSize: "11px" }}>{repo.forkCount}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: "11px", fontWeight: 500 }}>
                    View on GitHub →
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-[#ebebea] rounded-2xl p-10 text-center">
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.03em", maxWidth: "500px", margin: "0 auto", lineHeight: 1.2 }}>
            Need to get in touch?
          </h2>
          <a
            href="#"
            onClick={captcha.prompt}
            className="btn-glossy mt-6 inline-block px-6 py-2.5 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              background: "linear-gradient(135deg, #4f8fff 0%, #2563EB 40%, #1a4fd4 100%)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 8px rgba(37,99,235,0.3)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Talk with me
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e0e0dc]">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "-0.02em" }}>Goodbye!</span>
          <a href="#" onClick={captcha.prompt} className="text-[#888]" style={{ fontSize: "12px" }}>15brandon51@gmail.com</a>
        </div>
        <div className="max-w-5xl mx-auto px-6 pb-6 flex items-center justify-between">
          <div className="flex gap-5">
            {[
              { label: "Twitter", url: "https://x.com/__brandoncorona" },
              { label: "GitHub", url: "https://github.com/brandon-cor" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/brandon-corona-bhardwaj/" },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#aaa] hover:text-[#555] transition-colors" style={{ fontSize: "11px" }}>{s.label}</a>
            ))}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-[#aaa] hover:text-[#555] transition-colors" style={{ fontSize: "11px" }}>
            Back to top ↑
          </button>
        </div>
      </footer>

      {/* CAPTCHA MODAL */}
      {captcha.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={captcha.close}>
          <div
            className="bg-[#F2F2F0] p-8 max-w-sm w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>
              Quick verification
            </h3>
            <p className="text-[#777] mb-6" style={{ fontSize: "12px" }}>
              Solve this to confirm you're not a bot.
            </p>
            <p style={{ fontSize: "20px", fontWeight: 600, marginBottom: 16, color: "#2563EB" }}>
              What is {captcha.challenge.a} + {captcha.challenge.b}?
            </p>
            <input
              type="number"
              value={captcha.answer}
              onChange={(e) => captcha.setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && captcha.verify()}
              autoFocus
              className="w-full px-4 py-2.5 border border-[#ccc] bg-white outline-none focus:border-[#2563EB] transition-colors"
              style={{ fontSize: "14px" }}
              placeholder="Your answer"
            />
            {captcha.error && (
              <p className="mt-2 text-red-500" style={{ fontSize: "12px" }}>Incorrect, try again.</p>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={captcha.verify}
                className="btn-glossy flex-1 px-5 py-2.5 text-white transition-all duration-300"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  background: "linear-gradient(135deg, #4f8fff 0%, #2563EB 40%, #1a4fd4 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 8px rgba(37,99,235,0.3)",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Verify
              </button>
              <button
                onClick={captcha.close}
                className="px-5 py-2.5 border border-[#ccc] text-[#555] hover:border-[#999] transition-colors"
                style={{ fontSize: "12px", fontWeight: 500 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
