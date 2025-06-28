export default function GlobalSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-text-primary">
      <div className="animate-pulse text-center space-y-4">
        <div className="h-8 w-48 bg-primary/20 rounded mx-auto" />
        <div className="h-4 w-64 bg-primary/10 rounded mx-auto" />
        <div className="h-4 w-56 bg-primary/10 rounded mx-auto" />
      </div>
    </div>
  );
}