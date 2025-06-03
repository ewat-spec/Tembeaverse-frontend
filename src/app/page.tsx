'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [drivers, setDrivers] = useState<any[]>([])

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase.from('drivers').select('*')
      if (error) console.error('Error:', error)
      else setDrivers(data)
    }

    fetchDrivers()
  }, [])

  return (
    <div>
      <h1>Drivers List</h1>
      <ul>
        {drivers.map(driver => (
          <li key={driver.id}>
            {driver.first_name} {driver.last_name} — {driver.license_number}
          </li>
        ))}
      </ul>
    </div>
  )
}
