'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type RideLog = {
  id: number;
  customer_name: string;
  driver_name: string;
  timestamp: string;
};

export default function Dashboard() {
  const [logs, setLogs] = useState<RideLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase.from('ride_logs').select('*');
      if (error) {
        console.error(error);
      } else {
        setLogs(data ?? []);
      }
    };

    fetchLogs();

    const channel = supabase
      .channel('realtime:ride_logs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ride_logs' },
        payload => {
          if (payload.new) {
            setLogs(prev => {
              // Avoid duplicate logs
              if (prev.some(log => log.id === payload.new.id)) return prev;
              return [payload.new as RideLog, ...prev];
            });
          }
        }
      )
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
            {log.customer_name} rode with {log.driver_name} at {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
