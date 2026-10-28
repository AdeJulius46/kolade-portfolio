import Image from "next/image";
import Link from "next/link";
import { RecallGrid, Reveal } from "./components";
import { LoanTable, SheetVisual } from "./Visual";
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
  { when: "2025", title: "Data Science Intern", org: "LogicLeap", text: "Six-week internship completed September 2025: analysis and modelling tasks in Python and Jupyter." },
  { when: "Certificate", title: "Professional Certificate in Data Science", org: "SQI College of ICT", text: "Python, SQL, statistics, machine learning and data visualisation." },
  { when: "Degree", title: "B.Eng. Mechanical Engineering, First Class", org: "Adeleke University", text: "Statistics, physics and modelling foundations, later applied to projects like pipeline maintenance prediction." },
];

/* The small picture beside each project's title: a second view of the same work */
function ProjectAside({ visual }: { visual: "taxi" | "loan" | "sheet" }) {
  if (visual === "taxi")
    return <Image className="aside-shot" src="/taxi-3.webp" alt="Drivers page of the report: 2,000 drivers, 8.03 minute average pickup delay, 4.48 rating" width={860} height={482} sizes="(max-width: 900px) 70vw, 400px" />;
  if (visual === "loan") return <LoanTable />;
  return (
    <dl className="aside-figures">
      <div><dt>Linked sheets and forms</dt><dd>8</dd></div>
      <div><dt>Source of truth</dt><dd>1</dd></div>
      <div><dt>Licence cost</dt><dd>0</dd></div>
    </dl>
  );
}

function ProjectMain({ visual }: { visual: "taxi" | "loan" | "sheet" }) {
  if (visual === "taxi")
    return <Image src="/taxi-1.webp" alt="Overview page of the taxi report: 50K rides, 2.04M total fare, 1.63M paid, fares by month, top routes and cancellations by city" width={860} height={482} sizes="(max-width: 900px) 100vw, 60vw" />;
  if (visual === "loan") return <RecallGrid />;
  return <SheetVisual />;
}

export default function Home() {
  const taxi = projects[0];
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-portrait">
          <Image src="/kolade.webp" alt="Kolade Ogunleye in a navy waistcoat against an apricot backdrop" width={900} height={955} sizes="(max-width: 720px) 100vw, 40vw" priority />
        </div>
        <h1 className="name lines" aria-label="Kolade Ogunleye">
          <span className="line"><span data-line style={{ ["--i" as string]: 0 } as React.CSSProperties}>Kolade</span></span>
          <span className="line second"><span data-line style={{ ["--i" as string]: 1 } as React.CSSProperties}>Ogunleye</span></span>
        </h1>
        <div className="hero-foot">
          <p className="hero-lead">
            Data analyst and data scientist in Port Harcourt, Nigeria. I use SQL, Python, Excel and Power BI to turn raw tables
            into decisions, and build predictive models when the question calls for one.
          </p>
          <div className="hero-actions">
            <a className="btn" href={`mailto:${email}`}>Email me</a>
            <a className="text-link" href="#work">See the work</a>
          </div>
        </div>
      </section>

      <section className="showcase alt" aria-labelledby="gap-title">
        <Reveal className="showcase-head">
          <h2 id="gap-title">{taxi.tagline}</h2>
          <p>
            A ride-hailing company billed 2.04M in fares and received 1.63M. I cleaned {taxi.stats[0].value} rows across four tables,
            modelled them in DAX and built the Power BI report that found the gap: roughly a fifth of fares never reached the account.
          </p>
        </Reveal>
        <Reveal className="specimens">
          <figure><p className="specimen">2.04M</p><figcaption>Fares billed</figcaption></figure>
          <figure><p className="specimen">1.63M</p><figcaption>Actually paid</figcaption></figure>
        </Reveal>
      </section>

      <section id="work" className="work">
        <Reveal className="work-head">
          <h2>Selected work</h2>
          <p>Real datasets, real questions. Open any project for the full case study.</p>
        </Reveal>

        {projects.map((p) => (
          <article key={p.slug} className={`proj proj-${p.visual}`}>
            <Reveal className="proj-main">
              <ProjectMain visual={p.visual} />
            </Reveal>
            <Reveal className="proj-cluster" delay={120}>
              <ProjectAside visual={p.visual} />
              <div className="proj-text">
                <h3><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
                <div>
                  <p className="proj-q">{p.tagline}</p>
                  <p>{p.summary}</p>
                  <p className="proj-stack">{p.stack.join(", ")}</p>
                  <Link className="text-link" href={`/projects/${p.slug}`}>Read the case study</Link>
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </section>

      <section id="services" className="services accent">
        <Reveal as="div" className="cap-list">
          <div className="cap-row cap-head">
            <h2>What I do</h2>
            <p>From the first messy CSV to the slide a manager acts on.</p>
          </div>
          {services.map((s) => (
            <div key={s.title} className="cap-row">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="toolbox">
          <h3>Toolbox</h3>
          <dl>
            {skills.map((s) => <div key={s.area}><dt>{s.area}</dt><dd>{s.items}</dd></div>)}
          </dl>
        </Reveal>
      </section>

      <section id="experience" className="about">
        <Reveal className="about-head">
          <h2>Experience &amp; education</h2>
          <p>
            Engineering trained, data focused. A First Class mechanical engineering degree gave me statistics, physics and modelling;
            a data science certificate and an internship pointed them at data.
          </p>
        </Reveal>
        <div className="about-tiles">
          <Reveal className="place-tile">
            <div className="place-frame">
              <Image src="/place/bank-road.jpg" alt="Bank Road, Port Harcourt: the Rivers State Secretariat blocks in blue, red and ochre behind a palm, cars on the road under a bright sky" width={1920} height={985} sizes="(max-width: 900px) 100vw, 66vw" />
            </div>
            <p>Bank Road, Port Harcourt, the city I work from.</p>
          </Reveal>
          <Reveal className="open-tile accent" delay={120}>
            <p className="open-text">Open to data analyst and data scientist roles, plus freelance dashboard and analysis work.</p>
            <a className="btn btn-dark" href={`mailto:${email}`}>Email me</a>
          </Reveal>
        </div>
        <Reveal className="entries">
          {experience.map((e) => (
            <div key={e.title} className="entry">
              <p className="entry-when">{e.when}</p>
              <h3>{e.title}</h3>
              <p className="entry-org">{e.org}</p>
              <p>{e.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="contact" className="contact alt">
        <Reveal className="contact-form-wrap">
          <form className="contact-form" action={`mailto:${email}`} method="get">
            <h2 id="contact-title"><span>Let’s find what your data is hiding.</span> Tell me about the role or project.</h2>
            <input type="hidden" name="subject" value="Data role or project" />
            <div className="field">
              <input name="body" type="text" aria-labelledby="contact-title" aria-describedby="contact-note" placeholder="We need a sales dashboard by March" autoComplete="off" />
              <button type="submit" aria-label="Write the email">→</button>
            </div>
            <p id="contact-note" className="note">Opens your email app with this line, addressed to me.</p>
          </form>
        </Reveal>
        <Reveal className="contact-rows" delay={120}>
          <dl>
            <div><dt>Email</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
            <div><dt>Based in</dt><dd>Port Harcourt, Nigeria</dd></div>
            {socials.map((s) => (
              <div key={s.label}><dt>{s.label}</dt><dd><a href={s.href} target="_blank" rel="noreferrer">{s.href.replace(/^https:\/\/(www\.)?/, "")}</a></dd></div>
            ))}
          </dl>
        </Reveal>
      </section>
    </main>
  );
}
