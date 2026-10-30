import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardViewer from "../../DashboardViewer";
import Nav from "../../Nav";
import { Reveal } from "../../components";
import { ProjectVisual } from "../../Visual";
import { projects } from "../../data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} | Kolade Ogunleye` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main id="top" className="case">
        <section className="wrap case-hero">
          <div>
            <h1 className="lines"><span className="line"><span data-line style={{ ["--i" as string]: 0 } as React.CSSProperties}>{p.tagline}</span></span></h1>
            <p className="lead"><b>{p.title}.</b> {p.summary}</p>
          </div>
          <div className="case-meta">
            <div className="byline">
              <Image src="/kolade.webp" alt="Kolade Ogunleye" width={900} height={955} sizes="200px" />
              <p><b>Kolade Ogunleye</b><br />Data analyst, Port Harcourt</p>
            </div>
            <dl>
              <div><dt>Role</dt><dd>Analyst, end to end</dd></div>
              <div><dt>Tools</dt><dd><ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul></dd></div>
            </dl>
            <div className="actions">
              {p.links.map((l, i) => <a key={l.href} className={i === 0 ? "btn" : "btn btn-ghost"} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
            </div>
            <Link href="/#work" className="text-link">All projects</Link>
          </div>
        </section>

        <Reveal as="section" className="wrap case-visual">
          <h2 className="sr-only">{p.visual === "taxi" ? "The report" : "The work"}</h2>
          {p.visual === "taxi" ? (
            <DashboardViewer />
          ) : (
            <div className="case-pair">
              <div className="shot"><Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="(max-width: 900px) 100vw, 60vw" /></div>
              <ProjectVisual visual={p.visual} />
            </div>
          )}
        </Reveal>

        <section className="wrap" aria-labelledby="case-numbers">
          <h2 id="case-numbers" className="sr-only">In numbers</h2>
          <Reveal className="stats">
            {p.stats.map((s) => <div key={s.label} className="stat"><p className="stat-value">{s.value}</p><p className="stat-label">{s.label}</p></div>)}
          </Reveal>
        </section>

        <div className="wrap case-body">
          {p.sections.map((s) => (
            <Reveal key={s.heading} as="section" className="case-section">
              <h2>{s.heading}</h2>
              <div>
                {s.body && <p>{s.body}</p>}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </div>
            </Reveal>
          ))}
        </div>

        <section className="wrap section">
          <Link href={`/projects/${next.slug}`} className="next-project">
            <span className="next-text">
              <span className="next-title">Next: {next.title}</span>
              <span className="next-q">{next.tagline}</span>
            </span>
            <span className="shot next-shot"><Image src={next.cover.src} alt="" width={next.cover.width} height={next.cover.height} sizes="(max-width: 900px) 100vw, 40vw" /></span>
          </Link>
        </section>
      </main>
    </>
  );
}
