'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase
        .from('drivers') // Replace with your actual table name
        .select('*')

      if (error) console.error('Supabase Error:', error)
      else setDrivers(data || [])

      setLoading(false)
    }

    fetchDrivers()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Drivers List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {drivers.map((driver) => (
            <li key={driver.id} className="border p-2 rounded">
              {driver.first_name} {driver.last_name}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
