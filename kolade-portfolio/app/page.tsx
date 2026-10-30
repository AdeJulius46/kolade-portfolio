import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import { RecallGrid, Reveal } from "./components";
import { LoanTable } from "./Visual";
import { email, projects, socials } from "./data";

const services = [
  { title: "Data cleaning & SQL", text: "Joining, de-duplicating and validating messy tables so every number downstream can be trusted." },
  { title: "Dashboards & BI", text: "Power BI and Excel dashboards with DAX measures that answer the questions managers actually ask." },
  { title: "Machine learning", text: "Classification and regression models in Scikit-learn and XGBoost, tuned, evaluated and explained." },
  { title: "Deployment & automation", text: "Streamlit apps for live predictions, and Google Apps Script to automate data workflows in Sheets." },
];

/* Grouped from the projects and files: every entry is used in at least one piece of work above */
const skills = [
  { area: "Analysis & BI", items: "Power BI, DAX, Power Query, Excel, KPI design, time intelligence with calendar tables" },
  { area: "SQL & databases", items: "SQL, PostgreSQL, MySQL, SQLite, data modelling, Google Sheets as a database" },
  { area: "Python & machine learning", items: "Python, Pandas, NumPy, Scikit-learn, XGBoost, TensorFlow, GridSearchCV, SMOTE for class imbalance, feature importance" },
  { area: "Visualisation", items: "Matplotlib, Seaborn, Power BI reports, Excel charts" },
  { area: "Automation & deployment", items: "Google Apps Script, Google Forms, lookup tables and validation, Streamlit, Render, Git, Beautiful Soup for web scraping" },
  { area: "Foundations", items: "Statistics, data cleaning, financial and operations reporting, rosters and booking systems, Jupyter" },
];

const experience = [
  { when: "Certificate", title: "Professional Certificate in Data Science", org: "SQI College of ICT", text: "Python, SQL, statistics, machine learning and data visualisation." },
  { when: "Degree", title: "B.Eng. Mechanical Engineering, First Class", org: "Adeleke University", text: "Statistics, physics and modelling foundations, later applied to projects like pipeline maintenance prediction." },
];

const headline = [
  { value: "112K", label: "rows cleaned and modelled in one report" },
  { value: "88.7%", label: "test accuracy on the loan default model" },
  { value: "410K", label: "in unpaid fares found by the taxi analysis" },
  { value: "3", label: "end-to-end case studies" },
];

/* The picture or working fragment each project leads with */
function ProjectMedia({ visual }: { visual: "taxi" | "loan" | "sheet" }) {
  const p = projects.find((x) => x.visual === visual)!;
  if (visual === "loan") return <RecallGrid />;
  return (
    <div className="shot">
      <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="(max-width: 900px) 100vw, 60vw" />
    </div>
  );
}

export default function Home() {
  const taxi = projects[0];
  return (
    <>
      <Nav />
      <main id="top">
        <section className="hero wrap">
          <div className="hero-text">
            <h1 className="lines">
              <span className="line"><span data-line style={{ ["--i" as string]: 0 } as React.CSSProperties}>Kolade</span></span>
              <span className="line"><span data-line style={{ ["--i" as string]: 1 } as React.CSSProperties}>Ogunleye</span></span>
            </h1>
            <p className="lead">
              Data analyst and data scientist in Port Harcourt, Nigeria. I use SQL, Python, Excel and Power BI to turn raw tables
              into decisions, and build predictive models when the question calls for one.
            </p>
            <div className="actions">
              <a className="btn" href={`mailto:${email}`}>Email me</a>
              <a className="text-link" href="#work">See the work</a>
            </div>
          </div>
          <div className="hero-portrait">
            <Image data-speed="0.07" src="/kolade.webp" alt="Kolade Ogunleye in a navy waistcoat against an apricot backdrop" width={900} height={955} sizes="(max-width: 900px) 100vw, 40vw" priority />
            <p className="hero-tag">Open to data roles · First Class B.Eng.</p>
          </div>
        </section>

        <div className="drift-band" aria-hidden="true">
          <p className="drift-line" data-drift="1">Data analyst · Data analyst · Data analyst · Data analyst ·</p>
          <p className="drift-line outline" data-drift="-1">Data scientist · Data scientist · Data scientist · Data scientist ·</p>
        </div>

        <section className="wrap" aria-labelledby="numbers-title">
          <h2 id="numbers-title" className="sr-only">In numbers</h2>
          <Reveal className="stats">
            {headline.map((s) => (
              <div key={s.label} className="stat"><p className="stat-value">{s.value}</p><p className="stat-label">{s.label}</p></div>
            ))}
          </Reveal>
        </section>

        <section className="wrap gap-section" aria-labelledby="gap-title">
          <Reveal className="gap-text">
            <h2 id="gap-title">{taxi.tagline}</h2>
            <p>
              A ride-hailing company billed 2.04M in fares and received 1.63M. I cleaned {taxi.stats[0].value} rows across four tables,
              modelled them in DAX and built the Power BI report that found the gap: roughly a fifth of fares never reached the account.
            </p>
            <Link className="text-link" href={`/projects/${taxi.slug}`}>Read the taxi case study</Link>
          </Reveal>
          <Reveal className="gap-chart" delay={120}>
            <div className="meter-row">
              <div className="meter-head"><span>Fares billed</span><b>2.04M</b></div>
              <div className="meter"><i style={{ width: "100%" }} /></div>
            </div>
            <div className="meter-row">
              <div className="meter-head"><span>Actually paid</span><b className="hl">1.63M</b></div>
              <div className="meter"><i className="paid" style={{ width: "80%" }} /></div>
            </div>
            <p className="gap-note"><b className="hl">0.41M</b> missing, about 20% of everything billed.</p>
          </Reveal>
        </section>

        <section id="work" className="wrap section">
          <Reveal className="section-head">
            <h2>Selected work</h2>
            <p>Real datasets, real questions. Open any project for the full case study.</p>
          </Reveal>
          {projects.map((p, i) => (
            <article key={p.slug} className={`project${i % 2 ? " flip" : ""}`}>
              <Reveal className="project-media"><ProjectMedia visual={p.visual} /></Reveal>
              <Reveal className="project-text" delay={100}>
                <h3><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
                <p className="project-q">{p.tagline}</p>
                <p>{p.summary}</p>
                {p.visual === "loan" && <LoanTable />}
                <ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                <Link className="btn btn-ghost" href={`/projects/${p.slug}`}>Read the case study</Link>
              </Reveal>
            </article>
          ))}
        </section>

        <section id="services" className="wrap section">
          <Reveal className="section-head">
            <h2>What I do</h2>
            <p>From the first messy CSV to the slide a manager acts on.</p>
          </Reveal>
          <Reveal className="services">
            {services.map((s) => <div key={s.title} className="service"><h3>{s.title}</h3><p>{s.text}</p></div>)}
          </Reveal>
          <Reveal className="toolbox">
            <h3>Toolbox</h3>
            <dl>{skills.map((s) => <div key={s.area}><dt>{s.area}</dt><dd>{s.items}</dd></div>)}</dl>
          </Reveal>
        </section>

        <section id="experience" className="wrap section">
          <Reveal className="section-head">
            <h2>Experience &amp; education</h2>
            <p>
              Engineering trained, data focused. A First Class mechanical engineering degree gave me statistics, physics and modelling;
              a professional data science certificate pointed them at data.
            </p>
          </Reveal>
          <div className="exp">
            <Reveal className="entries">
              {experience.map((e) => (
                <div key={e.title} className="entry">
                  <p className="entry-when">{e.when}</p>
                  <div>
                    <h3>{e.title}</h3>
                    <p className="entry-org">{e.org}</p>
                    <p>{e.text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal className="city" delay={120}>
              <div className="city-frame">
              <Image data-speed="0.1" src="/place/bank-road.jpg" alt="Bank Road, Port Harcourt: the Rivers State Secretariat blocks behind a palm, cars on the road under a bright sky" width={1920} height={985} sizes="(max-width: 900px) 100vw, 45vw" />
              </div>
              <p>Bank Road, Port Harcourt, the city I work from.</p>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="wrap section">
          <Reveal className="contact">
            <form className="contact-form" action={`mailto:${email}`} method="get">
              <h2 id="contact-title">Let’s find what your data is hiding.</h2>
              <p>Hiring, or need a dashboard built? Tell me about it in one line.</p>
              <input type="hidden" name="subject" value="Data role or project" />
              <div className="field">
                <input name="body" type="text" aria-labelledby="contact-title" aria-describedby="contact-note" placeholder="We need a sales dashboard by March" autoComplete="off" />
                <button type="submit" aria-label="Write the email">→</button>
              </div>
              <p id="contact-note" className="small">Opens your email app with this line, addressed to me.</p>
            </form>
            <dl className="contact-rows">
              <div><dt>Email</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
              <div><dt>Based in</dt><dd>Port Harcourt, Nigeria</dd></div>
              {socials.map((s) => (
                <div key={s.label}><dt>{s.label}</dt><dd><a href={s.href} target="_blank" rel="noreferrer">{s.href.replace(/^https:\/\/(www\.)?/, "")}</a></dd></div>
              ))}
            </dl>
          </Reveal>
        </section>
      </main>
    </>
  );
}
