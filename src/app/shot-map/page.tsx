"use client";

import { useEffect, useState } from "react";
import { Shot } from "@/types/shot";
import CourtContainer from "@/components/CourtContainer";

export default function ShotMapPage() {
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    async function fetchShots() {
      try {
        const response = await fetch("/api/shots");
        const data = await response.json();
        console.log("Fetched shots:", data.length);
        setShots(data);
      } catch (error) {
        console.error("Error fetching shots:", error);
      }
    }
    fetchShots();
  }, []);

  return (
    <main className="flex flex-col h-[calc(100vh-3.5rem)] p-6">
      <h1 className="text-2xl font-bold mb-4">Shot Map & Efficiency</h1>
      <div className="flex-1 min-h-0">
        <CourtContainer shots={shots} />
      </div>
    </main>
  );
}
