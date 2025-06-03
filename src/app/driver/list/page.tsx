'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DriverListPage() {
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase.from('drivers').select('*')
      if (error) {
        console.error('Error fetching drivers:', error)
      } else {
        setDrivers(data)
      }
      setLoading(false)
    }

    fetchDrivers()
  }, [])

  if (loading) return <p>Loading drivers...</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Driver List</h1>
      {drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <ul className="space-y-2">
          {drivers.map((driver) => (
            <li key={driver.id} className="border p-2 rounded">
              <strong>{driver.first_name} {driver.last_name}</strong> — License: {driver.license_number}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
