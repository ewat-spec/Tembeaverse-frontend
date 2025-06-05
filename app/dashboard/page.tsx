'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase.from('ride_logs').select('*');
      if (error) console.error(error);
      else setLogs(data);
    };

    fetchLogs();

    const channel = supabase
      .channel('realtime:ride_logs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ride_logs' }, payload => {
        setLogs(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Ride Logs</h1>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.customer_name} rode with {log.driver_name} at {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}
