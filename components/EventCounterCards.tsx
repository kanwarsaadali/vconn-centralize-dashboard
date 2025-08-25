'use client';

import React, { useEffect, useState } from 'react';

export default function EventCounterCards() {
  const [serverCount, setServerCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Target counts from API
  const [targetServer, setTargetServer] = useState(0);
  const [targetEvent, setTargetEvent] = useState(0);
  const [targetUser, setTargetUser] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/get-Agents`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/event-count`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user-count`).then(res => res.json()),
    ])
      .then(([serverData, eventData, userData]) => {
        if (serverData?.count) setTargetServer(serverData.count);
        if (eventData?.count) setTargetEvent(eventData.count);
        if (userData?.count) setTargetUser(userData.count);
      })
      .catch(err => console.error('Error fetching counts:', err));
  }, []);

  // Animation function
  const animateCount = (start: number, end: number, setValue: (n: number) => void) => {
    let startTime: number | null = null;
    const duration = 1000; // 1 second animation

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Trigger animation when targets update
  useEffect(() => {
    animateCount(0, targetServer, setServerCount);
  }, [targetServer]);

  useEffect(() => {
    animateCount(0, targetEvent, setEventCount);
  }, [targetEvent]);

  useEffect(() => {
    animateCount(0, targetUser, setUserCount);
  }, [targetUser]);

  const counters = [
    { title: 'Count of Event', value: eventCount },
    { title: 'Count of Server', value: serverCount },
    { title: 'Count of User', value: userCount },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {counters.map((counter) => (
        <div
          key={counter.title}
          className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 outline outline-1"
        >
          <div className="text-3xl font-bold text-blue-600">{counter.value}</div>
          <div className="text-sm text-gray-500">{counter.title}</div>
        </div>
      ))}
    </div>
  );
}
