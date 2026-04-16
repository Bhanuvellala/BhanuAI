import { profile } from "@/data/profile";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="container-premium flex flex-col items-center justify-between gap-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} {profile.fullName}. Crafted with care.</div>
        <nav aria-label="Social" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a className="transition-colors hover:text-primary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-primary" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {profile.personalSite ? (
            <a className="transition-colors hover:text-primary" href={profile.personalSite} target="_blank" rel="noopener noreferrer">
              Site
            </a>
          ) : null}
          <a className="transition-colors hover:text-primary" href={`mailto:${profile.email}`}>
            Email
          </a>
        </nav>
        <div className="font-mono text-center md:text-right">Built for clarity · impact · velocity.</div>
      </div>
    </footer>
  );
};
