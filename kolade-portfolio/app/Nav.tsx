import Link from "next/link";
import { ThemeToggle } from "./components";

export default function Nav() {
  return (
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
  );
}
