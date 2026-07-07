export default function Logo({
  size = 22,
  title = 'Ritik Kumar',
  className = '',
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect x="2" y="2" width="28" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <text x="16" y="21" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">RK</text>
    </svg>
  );
}
