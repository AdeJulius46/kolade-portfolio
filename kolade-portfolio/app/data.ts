export const email = "ogunleyekolade8@gmail.com";

export const socials = [
  { label: "GitHub", href: "https://github.com/KayD128" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kolade-ogunleye-005182241" },
  { label: "Kaggle", href: "https://www.kaggle.com/kayogun" },
  { label: "Portfolio", href: "https://www.datascienceportfol.io/ogunleyekolade8" },
];

export type Project = {
  slug: string;
  kind: string;
  title: string;
  tagline: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  stats: { value: string; label: string }[];
  visual: "taxi" | "loan" | "sheet";
  cover: { src: string; alt: string; caption: string; width: number; height: number };
  sections: { heading: string; body?: string; list?: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "taxi-company-dashboard",
    kind: "Business intelligence",
    title: "Taxi company analysis dashboard",
    tagline: "Where did 410K in fares go?",
    summary:
      "Four linked tables (riders, drivers, rides, payments, about 112,000 rows) cleaned in Power Query, modelled with DAX and presented as a three-page Power BI report on demand, revenue, staffing and routes.",
    stack: ["Power BI", "SQL", "DAX", "Power Query"],
    links: [{ label: "Code & files", href: "https://github.com/KayD128/Taxi-Company-Dashboard" }],
    stats: [
      { value: "112K", label: "rows across 4 tables" },
      { value: "2.04M", label: "fares billed" },
      { value: "1.63M", label: "actually paid" },
      { value: "8.03 min", label: "average pickup delay" },
    ],
    visual: "taxi",
    cover: { src: "/taxi-1.webp", alt: "Overview page of the taxi Power BI report", caption: "The overview page of the Power BI report.", width: 860, height: 482 },
    sections: [
      {
        heading: "The brief",
        body: "The owners of a ride-hailing company wanted one place to see demand, revenue and driver performance, so they could make decisions on pricing, staffing, routes and demand forecasting.",
      },
      {
        heading: "Cleaning the data",
        list: [
          "Removed duplicate records from every table and confirmed there were no nulls.",
          "Converted all date and time columns to proper formats.",
          "Fixed inconsistent spellings that were splitting the same city into two values.",
          "Filtered out invalid trips such as negative fares and payment amounts.",
          "Built a calendar table for time intelligence.",
        ],
      },
      {
        heading: "Modelling with DAX",
        list: [
          "Calculated columns: driver and rider tenure in days, pickup delay in minutes, route (pickup city to drop-off city), time segment and day of week.",
          "Measures: distinct driver count, average pickup time, average monthly rides, cancellation rate and total rides.",
        ],
      },
      {
        heading: "The report",
        list: [
          "Overview: KPI cards for rides, fares, distance and payments, monthly trends, completed vs cancelled rides by city, and the top 5 routes.",
          "Riders: rider count, average tenure, pickup time by month, riders per city, top riders by distance and ride count.",
          "Drivers: driver count, average pickup delay, rating, drivers per city, top drivers by distance and by fares generated.",
        ],
      },
      {
        heading: "What the data said",
        list: [
          "2.04M was billed but only 1.63M was paid. Roughly a fifth of fares never reached the account, so the finance records need a closer look.",
          "Demand peaks in the morning rush and is lowest at night. More drivers should be scheduled for mornings.",
          "There are 2,000 drivers for 10,000 riders, which looks overstaffed given riders don't all travel at once.",
          "An 8.03 minute average pickup delay is the clearest lever on the 4.48 driver rating.",
          "Calgary to Toronto and Los Angeles to Ottawa are the busiest routes. Chicago has the most cancellations.",
          "Payment method has no real effect on fares or ride volume.",
        ],
      },
    ],
  },
  {
    slug: "loan-default-prediction",
    kind: "Machine learning",
    title: "Loan default prediction",
    tagline: "Will this borrower default?",
    summary:
      "Compared five classifiers with GridSearchCV, handled heavy class imbalance with SMOTE, and deployed the best model as a Streamlit app for real-time predictions.",
    stack: ["Python", "Pandas", "Scikit-learn", "XGBoost", "SMOTE", "Streamlit"],
    links: [
      { label: "Live demo", href: "https://dayfigurez-capstone-project-5.onrender.com/" },
      { label: "Code", href: "https://github.com/KayD128/dayfigurez-capstone-project" },
    ],
    stats: [
      { value: "88.7%", label: "test accuracy" },
      { value: "5", label: "models compared" },
      { value: "17", label: "applicant features" },
      { value: "Live", label: "Streamlit app" },
    ],
    visual: "loan",
    cover: { src: "/work/loan-app.png", alt: "The deployed loan default Streamlit app: applicant fields in the sidebar and a Predict Result button", caption: "The deployed Streamlit app: applicant details in the sidebar, one button for the prediction.", width: 1200, height: 700 },
    sections: [
      {
        heading: "The brief",
        body: "Lenders lose money when borrowers default. Using historical loan applications from Kaggle, the goal was to predict whether a new applicant is likely to default, find the factors that matter most, and put the model in a simple web app.",
      },
      {
        heading: "The data",
        body: "Each application includes age, income, loan amount, credit score, months employed, credit lines, interest rate, loan term, debt-to-income ratio, education, employment type, marital status, mortgage, dependants, loan purpose and co-signer. The target is whether the borrower defaulted.",
      },
      {
        heading: "Approach",
        list: [
          "Exploratory analysis found no missing values or heavy skew, but a strong class imbalance in the target.",
          "Dropped the unique Loan ID, encoded categorical fields, split train and test sets, and scaled features.",
          "Trained logistic regression, decision tree, random forest, KNN and XGBoost with GridSearchCV.",
          "Used SMOTE to rebalance the classes before training the final XGBoost model.",
        ],
      },
      {
        heading: "Results, honestly",
        body: "XGBoost reached 88.7% accuracy. It is excellent at recognising borrowers who repay (recall 0.99) but catches only about 10% of actual defaulters. Feature importance ranked age highest. The next steps are richer features and tuning the decision threshold to match the real cost of a missed default.",
      },
      {
        heading: "Deployment",
        body: "The trained pipeline is served in a Streamlit app hosted on Render, with an input form for an applicant's details and an instant prediction.",
      },
    ],
  },
  {
    slug: "pectoria-database",
    kind: "Data design & automation",
    title: "Pectoria database design",
    tagline: "A database without buying software",
    summary:
      "A structured database built in Google Sheets with Apps Script automating entry and record handling, giving the team one consistent source of truth.",
    stack: ["Google Sheets", "Apps Script"],
    links: [{ label: "View design files", href: "https://drive.google.com/drive/folders/1UnHme4M-tDsNpPR8AlWljyVxGmo7MOm8?usp=drive_link" }],
    stats: [
      { value: "8", label: "linked sheets and forms" },
      { value: "1", label: "source of truth" },
      { value: "0", label: "licence cost" },
    ],
    visual: "sheet",
    cover: { src: "/work/pectoria-drive.png", alt: "The Pectoria Database Design folder in Google Drive, listing eight sheets and forms", caption: "The shared design folder: eight linked sheets and forms.", width: 1440, height: 600 },
    sections: [
      {
        heading: "The brief",
        body: "Pectoria's records lived in scattered files, which made it hard to trust any single number. They needed one reliable place to keep data without paying for database software.",
      },
      {
        heading: "What I built",
        list: [
          "Designed the database structure in Google Sheets so each type of record has its own consistent table.",
          "Wrote Apps Script automations to handle data entry and keep records consistent.",
          "Gave the team one shared source of truth they already know how to use.",
        ],
      },
      {
        heading: "What is in it",
        list: [
          "Reservations: every booking, today's arrivals, group and single bookings, and the room rates they price from.",
          "A reservation form that feeds the reservation sheet, and a check-in sheet for the front desk.",
          "Restaurant performance: money received, money spent, expenditure, income and a performance summary, driven by lookup tables.",
          "Financial statements and a maintenance log built on the same records.",
          "A staff roster by team and role, counting who is on day duty, night duty or leave each day.",
        ],
      },
    ],
  },
];
