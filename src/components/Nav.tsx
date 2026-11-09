import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Agents", href: "#agents" },
  { label: "Control", href: "#control" },
  { label: "Integrations", href: "#integrations" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.07] bg-[#060708]/88 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="mono hidden items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#6d747e] lg:flex">
            <span className="dot dot-live" />
            Private beta
          </span>
          <div className="hidden sm:block">
            <a href="#access" className="btn btn-crimson btn-sm">
              Request access
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded border border-white/12 text-[#cfd4db] transition-colors hover:border-white/25 hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/[0.06] bg-[#060708] transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="shell flex flex-col py-5">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/[0.055] py-4 text-[15px] text-[#c8cdd4]"
            >
              <span>{link.label}</span>
              <span className="card-index">{String(i + 1).padStart(2, "0")}</span>
            </a>
          ))}
          <a href="#access" onClick={() => setOpen(false)} className="btn btn-crimson mt-5 w-full">
            Request access
            <Icon name="arrow-up-right" size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
