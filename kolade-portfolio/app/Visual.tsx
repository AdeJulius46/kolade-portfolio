import Image from "next/image";
import { RecallGrid } from "./components";

export function LoanTable() {
  const rows = [
    { label: "Repaid", p: 0.89, r: 0.99, f: 0.94 },
    { label: "Defaulted", p: 0.51, r: 0.1, f: 0.16 },
  ];
  return (
    <div className="v-loan" data-ui>
      <p className="v-loan-head"><b>88.7%</b> accuracy, XGBoost on the test set</p>
      <table>
        <thead><tr><th scope="col">Class</th><th scope="col">Precision</th><th scope="col">Recall</th><th scope="col">F1</th></tr></thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.label}>
              <th scope="row">{m.label}</th>
              {[m.p, m.r, m.f].map((v, i) => <td key={i}>{v.toFixed(2)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* The files in the shared Pectoria folder and the tabs inside them (records themselves are private) */
const sheetFiles = [
  ["Reservation Sheet", "All reservations, Today’s reservation, Group booking, Single booking, Room rates"],
  ["Reservation form", "Google Form feeding the reservation sheet"],
  ["Check in Sheet", "Front desk arrivals"],
  ["Restaurant Performance", "Money received, Money spent, Expenditure, Income, Performance, Lookup tables"],
  ["Financial Statements", "Statements built from the same records"],
  ["Maintenance Sheet", "Repairs and upkeep log"],
  ["Staff Management Sheet", "Roster by team and role, day duty, night duty, leave"],
];

export function SheetVisual() {
  return (
    <div className="v-sheet" data-ui>
      <p className="v-sheet-title">Pectoria Database Design</p>
      <table>
        <thead><tr><th scope="col">File</th><th scope="col">Tabs and purpose</th></tr></thead>
        <tbody>
          {sheetFiles.map(([name, tabs]) => (
            <tr key={name}><th scope="row">{name}</th><td>{tabs}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProjectVisual({ visual }: { visual: "taxi" | "loan" | "sheet" }) {
  if (visual === "taxi")
    return <Image src="/taxi-1.webp" alt="Taxi company Power BI overview dashboard" width={860} height={482} sizes="(max-width: 900px) 100vw, 860px" />;
  if (visual === "loan")
    return (
      <div className="loan-pair">
        <RecallGrid />
        <LoanTable />
      </div>
    );
  return <SheetVisual />;
}
