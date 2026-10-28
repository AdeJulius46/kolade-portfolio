import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardViewer from "../../DashboardViewer";
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
    <main id="top" className="case">
      <section className="case-hero">
        <h1 className="case-title lines"><span className="line"><span data-line style={{ ["--i" as string]: 0 } as React.CSSProperties}>{p.tagline}</span></span></h1>
        <div className="case-intro">
          <p className="case-lead"><b>{p.title}.</b> {p.summary}</p>
          <div className="case-meta">
            <dl>
              <div className="byline">
                <Image src="/kolade.webp" alt="" width={900} height={955} sizes="176px" />
                <div><dt>Role</dt><dd>Kolade Ogunleye, analyst, end to end</dd></div>
              </div>
              <div><dt>Tools</dt><dd>{p.stack.join(", ")}</dd></div>
            </dl>
            <div className="case-links">
              {p.links.map((l, i) => <a key={l.href} className={i === 0 ? "btn" : "text-link"} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
              <Link href="/#work" className="text-link">All projects</Link>
            </div>
          </div>
        </div>
      </section>

      <Reveal className={`case-visual case-visual-${p.visual}`}>
        {p.visual === "taxi" ? <DashboardViewer /> : <ProjectVisual visual={p.visual} />}
      </Reveal>

      {p.visual !== "taxi" && (
        <Reveal as="section" className="case-cover">
          <h2>The real thing</h2>
          <figure>
            <div className="case-cover-frame">
              <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="(max-width: 900px) 100vw, 1100px" />
            </div>
            <figcaption>{p.cover.caption}</figcaption>
          </figure>
        </Reveal>
      )}

      <Reveal as="section" className="case-stats-wrap">
        <h2 className="case-stats-title">In numbers</h2>
        <dl className="case-stats">
          {p.stats.map((s) => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
        </dl>
      </Reveal>

      <div className="case-body">
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

      <Link href={`/projects/${next.slug}`} className="next-project accent">
        <span className="next-title">Next: {next.title}</span>
        <span className="next-shot">
          <Image src={next.cover.src} alt="" width={next.cover.width} height={next.cover.height} sizes="(max-width: 720px) 100vw, 40vw" />
        </span>
      </Link>
    </main>
  );
}
