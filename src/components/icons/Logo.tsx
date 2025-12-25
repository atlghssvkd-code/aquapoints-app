import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z" />
    <path d="M12 12l-2 2.5 2 2.5 2-2.5-2-2.5z" stroke="hsl(var(--primary-foreground))" fill="hsl(var(--primary-foreground))" />
  </svg>
);

export default Logo;
