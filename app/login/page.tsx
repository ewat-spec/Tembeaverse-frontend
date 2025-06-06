"use client";

import { useState } from "react"; import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [role, setRole] = useState("customer");

const handleLogin = async () => { const { error } = await supabase.auth.signInWithPassword({ email, password, }); if (error) alert(error.message); };

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100"> <div className="bg-white p-8 rounded shadow-md w-full max-w-sm"> <h1 className="text-xl font-bold mb-4">Login</h1> <select value={role} onChange={(e) => setRole(e.target.value)} className="mb-4 w-full p-2 border rounded" > <option value="customer">Customer</option> <option value="driver">Driver</option> <option value="director">Director</option> </select> <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full p-2 border rounded" /> <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full p-2 border rounded" /> <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded"> Login </button> </div> </div> ); }
