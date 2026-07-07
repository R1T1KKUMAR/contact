import SocialIcon from './SocialIcon.jsx';

export default function SocialLinks({ links }) {
  return (
    <div className="social-row">
      {(links || []).map((link) => {
        const isInternal = typeof link?.href === 'string' && link.href.startsWith('#');
        const target = isInternal ? undefined : '_blank';
        const rel = isInternal ? undefined : 'noreferrer';

        return (
          <a
            key={link.id}
            className="social-link"
            href={link.href}
            target={target}
            rel={rel}
          >
            <SocialIcon id={link.id} />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
