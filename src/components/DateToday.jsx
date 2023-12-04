import { useState, useEffect } from 'react';

export function DateToday () {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 8 && currentHour < 12) {
      setGreeting("¡Buenos días!");
    } else if (currentHour >= 12 && currentHour < 20) {
      setGreeting("¡Buenas tardes!");
    } else {
      setGreeting("¡Buenas noches!");
    }
  }, []);

  return <p className="text-[32px] font-extrabold text-white tracking-tighter">{greeting}</p>;
};