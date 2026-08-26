import React from "react";
import { Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { useSanityData } from "../contexts/SanityDataContext";
import { optimizedUrl } from "../services/sanity";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Footer() {
  const { footer, contact } = useSanityData();

  const logoUrl = footer?.logo ? optimizedUrl(footer.logo, { width: 256, quality: 90 }) : null;
  const mainEmail: string = contact?.emails?.[0] || "";
  const mainPhone: string = contact?.phones?.[0] || "";
  const description: string = footer?.description || "";
  const navGroups: any[] = footer?.navGroups || [];
  const socials = footer?.socials || {};
  const bottomLinks: any[] = footer?.bottomLinks || [];

  return (
    <footer className="section-white border-t border-slate-200" aria-label="Site footer">
      <div className="container-editorial">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center mb-8">
              {logoUrl ? (
                <img src={logoUrl} alt="Azul Tech" className="w-32 h-auto" loading="lazy" decoding="async" />
              ) : (
                <Logo className="w-32 h-auto text-slate-900" />
              )}
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">{description}</p>
            <div className="space-y-3">
              {mainEmail && (
                <a
                  href={`mailto:${mainEmail}`}
                  className="flex items-center gap-3 text-[10px] font-technical uppercase tracking-widest text-slate-400 hover:text-brand-blue transition-colors"
                >
                  <Mail size={14} /> {mainEmail}
                </a>
              )}
              {mainPhone && (
                <a
                  href={`tel:${mainPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 text-[10px] font-technical uppercase tracking-widest text-slate-400 hover:text-brand-blue transition-colors"
                >
                  <Phone size={14} /> {mainPhone}
                </a>
              )}
            </div>
          </motion.div>

          {navGroups.map((section: any) => (
            <motion.div
              key={section.title}
              variants={fadeUp}
              className={section.title === "Architecture" ? "col-span-1 lg:col-span-2" : ""}
            >
              <h4 className="text-[10px] font-technical uppercase tracking-widest text-slate-900 mb-6 font-bold">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links?.map((link: any) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      className="group relative block overflow-hidden h-[1.4em] text-sm"
                    >
                      {/* Default — rolls out upward */}
                      <span className="block text-slate-500 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      {/* Brand-blue copy — rolls in from below */}
                      <span className="absolute inset-0 text-brand-blue translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6 items-center">
            <div className="text-[10px] font-technical text-slate-400">
              © {new Date().getFullYear()} AZUL TECH LTD.
            </div>
            <div className="flex gap-4 text-[10px] font-technical uppercase tracking-widest text-slate-500">
              {bottomLinks.map((link: any) => (
                <a key={link.label} href={link.url} className="hover:text-brand-blue transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} className="text-slate-400 hover:text-brand-blue transition-colors" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter size={18} className="text-slate-400 hover:text-brand-blue transition-colors" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
