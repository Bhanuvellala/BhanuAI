import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("[404]", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="glass max-w-md rounded-3xl p-10 text-center shadow-elegant">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">This page does not exist</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The URL may be mistyped, or the page was moved. Head back to the portfolio home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
        >
          <Home className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
