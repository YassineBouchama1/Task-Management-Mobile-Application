import { useState, useEffect, useCallback } from 'react';

interface UseElapsedTimeProps {
  startTime?: number;
  endTime?: number;
  estimatedTime?: number;
}

export const useElapsedTime = ({ startTime, endTime, estimatedTime }: UseElapsedTimeProps) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isNearDeadline, setIsNearDeadline] = useState(false);

  const calculateElapsedTime = useCallback(() => {
    if (!startTime) return 0;
    const end = endTime || Date.now();
    return Math.floor((end - startTime) / 1000);
  }, [startTime, endTime]);

  const checkDeadline = useCallback(() => {
    if (!estimatedTime || !startTime) return false;
    const timeLeft = estimatedTime - calculateElapsedTime();
    return timeLeft <= 3600 && timeLeft > 0; 
  }, [estimatedTime, startTime, calculateElapsedTime]);

  useEffect(() => {
    if (!startTime || endTime) {
      setElapsedTime(calculateElapsedTime());
      return;
    }

    const timer = setInterval(() => {
      const newElapsedTime = calculateElapsedTime();
      setElapsedTime(newElapsedTime);
      setIsNearDeadline(checkDeadline());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime, calculateElapsedTime, checkDeadline]);

  return { elapsedTime, isNearDeadline };
};
