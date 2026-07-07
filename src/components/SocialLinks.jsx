import SocialIcon from './SocialIcon.jsx';

function brandStyle(id) {
  switch (id) {
    case 'linkedin':
      return { borderColor: 'rgba(0, 119, 181, 0.5)' };
    case 'github':
      return { borderColor: 'rgba(255, 255, 255, 0.22)' };
    case 'email':
      return { borderColor: 'rgba(167, 139, 250, 0.4)' };
    default:
      return undefined;
  }
}

export default function SocialLinks({ links }) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__title">Connect</div>
        <div className="pills">
          {(links || []).map((link) => {
            const isInternal = typeof link?.href === 'string' && link.href.startsWith('#');
            const target = isInternal ? undefined : '_blank';
            const rel = isInternal ? undefined : 'noreferrer';

            return (
              <a
                key={link.id}
                className="btn pill btn--social"
                data-brand={link.id}
                style={brandStyle(link.id)}
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
      </div>
    </div>
  );
}
