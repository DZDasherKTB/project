import React from 'react';

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background text-text-primary transition-opacity duration-500">
      <div className="text-center animate-pulse">
        <h1 className="text-4xl font-bold tracking-wider">Dashpreet Singh</h1>
        <p className="mt-2 text-sm text-muted">Loading portfolio...</p>
      </div>
    </div>
  );
}
