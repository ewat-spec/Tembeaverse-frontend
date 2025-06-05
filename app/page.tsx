//tembeaverse-frontend/app/page.tsx "use client";

import { useEffect, useState } from "react"; import { supabase } from "@/lib/supabaseClient"; import Image from "next/image"; import UserMenu from "@/components/UserMenu";

export default function Home() { const [drivers, setDrivers] = useState<any[]>([]);

useEffect(() => { const fetchDrivers = async () => { const { data, error } = await supabase.from("drivers").select("*"); if (error) console.error("Error:", error); else setDrivers(data); }; fetchDrivers(); }, []);

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 p-4"> <UserMenu /> <h1 className="text-2xl font-bold mb-6">Available Drivers</h1> <ul className="space-y-3 w-full max-w-md"> {drivers.map((driver) => ( <li key={driver.id} className="bg-white p-4 rounded shadow-md"> {driver.first_name} {driver.last_name} </li> ))} </ul> <footer className="mt-10 text-sm text-gray-500">Powered by OpenAI</footer> </div> ); }
