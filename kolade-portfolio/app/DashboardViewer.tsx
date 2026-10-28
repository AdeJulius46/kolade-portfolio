"use client";

import Image from "next/image";
import { useState } from "react";

const pages = [
  { id: "main", label: "Overview", src: "/taxi-1.webp", alt: "Rides overview page: 50K rides, 2.04M total fare, 1.63M paid, monthly fares, top routes and cancellations by city" },
  { id: "riders", label: "Riders", src: "/taxi-2.webp", alt: "Riders page: 10,000 riders, riders per city, average pickup time by month, top riders by rides and distance" },
  { id: "drivers", label: "Drivers", src: "/taxi-3.webp", alt: "Drivers page: 2,000 drivers, 8.03 minute average pickup delay, 4.48 average rating, top drivers by distance and fares" },
];

/* The three report pages: the large view shows one, the thumbnails beside it switch between them */
export default function DashboardViewer() {
  const [active, setActive] = useState(pages[0].id);
  const current = pages.find((p) => p.id === active)!;

  return (
    <div className="viewer">
      <div className="viewer-frame">
        <Image key={current.id} src={current.src} alt={current.alt} width={860} height={482} sizes="(max-width: 900px) 100vw, 75vw" priority />
      </div>
      <div className="viewer-thumbs" role="group" aria-label="Report pages">
        {pages.map((p) => (
          <button key={p.id} aria-pressed={p.id === active} className="thumb" onClick={() => setActive(p.id)}>
            <Image src={p.src} alt="" width={860} height={482} sizes="240px" />
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
