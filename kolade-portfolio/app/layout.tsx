import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { email, socials } from "./data";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}

        <footer className="footer">
          <p>Kolade Ogunleye, data analyst in Port Harcourt</p>
          <ul>
            <li><a href={`mailto:${email}`}>Email</a></li>
            {socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}
          </ul>
          <p className="footer-end">
            © {new Date().getFullYear()} · <Link href="/#top">Back to top</Link>
          </p>
          <p className="credit">
            Bank Road photograph: <a href="https://commons.wikimedia.org/wiki/File:Bank_Road,_Port_Harcourt,.jpg" target="_blank" rel="noreferrer">“Bank Road, Port Harcourt” by SteadyWins</a>,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>, via Wikimedia Commons.
          </p>
        </footer>
      </body>
    </html>
  );
}
