import { useEffect, useRef, useState } from "react";

export function NumberTicker({ value, duration = 1000, prefix = "", suffix = "" }: { value: number; duration?: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const startTime = useRef<number | null>(null);
  useEffect(() => {
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return <span>{prefix}{display.toLocaleString("pt-PT")}{suffix}</span>;
}
