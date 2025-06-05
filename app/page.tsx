'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import UserMenu from "@/components/UserMenu";

export default function Home() {
  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDrivers() {
      const { data, error } = await supabase.from("drivers").select("*");
      if (error) {
        console.error("Error fetching drivers:", error);
      } else {
        setDrivers(data || []);
      }
    }

    fetchDrivers();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6 text-gray-800">
      <UserMenu />
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to TembeaVerse 🚖</h1>
        <p className="text-center text-lg mb-10">
          Real-time smart transportation for Kenya's future.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Available Drivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <div
                key={driver.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="text-xl font-medium">{driver.name}</h3>
                <p className="text-sm">Phone: {driver.phone}</p>
                <p className="text-sm">Vehicle: {driver.vehicle_type}</p>
              </div>
            ))
          ) : (
            <p>No drivers available at the moment.</p>
          )}
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-gray-500">
        Powered by <span className="font-bold text-blue-600">OpenAI</span>
      </div>
    </main>
  );
}
