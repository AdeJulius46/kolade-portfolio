import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "./components";
import { email, projects, socials } from "./data";

export const metadata: Metadata = {
  title: "Kolade Ogunleye | Data Analyst & Data Scientist",
  description:
    "Data Analyst and Data Scientist in Port Harcourt, Nigeria. SQL, Python, Power BI and Excel for dashboards, analysis and predictive models.",
  openGraph: {
    title: "Kolade Ogunleye | Data Analyst & Data Scientist",
    description: "Dashboards, analysis and machine learning that support real decisions.",
    images: ["/kolade.webp"],
  },
};

// Runs before paint: restores the saved theme and marks that scripts run, so reveal states only hide content when they can undo it.
const bootScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link href="https://api.fontshare.com/v2/css?f[]=sentient@300,400,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="bar">
          <Link href="/" className="mark" aria-label="Kolade Ogunleye, home">KO</Link>
          <nav aria-label="Primary">
            <Link href="/#work">Work</Link>
            <Link href="/#services">Skills</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#contact">Contact</Link>
            <ThemeToggle />
          </nav>
        </header>

        {children}

        <footer className="footer">
          <div className="footer-row">
            <ul className="places">
              <li><a href={`mailto:${email}`}>{email}</a></li>
              <li><a href={socials[1].href} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={socials[0].href} target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
            <div className="footer-cols">
              <div>
                <h2>Case studies</h2>
                <ul>{projects.map((p) => <li key={p.slug}><Link href={`/projects/${p.slug}`}>{p.title}</Link></li>)}</ul>
              </div>
              <div>
                <h2>Elsewhere</h2>
                <ul>{socials.slice(2).map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
              </div>
              <div>
                <h2>Picture credit</h2>
                <p>
                  Bank Road photograph: <a href="https://commons.wikimedia.org/wiki/File:Bank_Road,_Port_Harcourt,.jpg" target="_blank" rel="noreferrer">“Bank Road, Port Harcourt” by SteadyWins</a>,{" "}
                  <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>, via Wikimedia Commons.
                </p>
              </div>
            </div>
          </div>
          <div className="legal">
            <span>© {new Date().getFullYear()} Kolade Ogunleye, Port Harcourt</span>
            <a href="#top">Back to top</a>
          </div>
          <p className="footer-name" aria-hidden="true">Kolade Ogunleye</p>
        </footer>
      </body>
    </html>
  );
}
