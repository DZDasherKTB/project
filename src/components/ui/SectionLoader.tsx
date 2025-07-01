import React, { useRef, useState, useEffect, Suspense } from 'react';
import GlobalSkeleton from './GlobalSkeleton';

interface SectionLoaderProps {
  children: React.ReactNode;
}

export default function SectionLoader({ children }: SectionLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={<GlobalSkeleton />}>{children}</Suspense>
      ) : (
        <div style={{ height: '60vh' }} />
      )}
    </div>
  );
}
