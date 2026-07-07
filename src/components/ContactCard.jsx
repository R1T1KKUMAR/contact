import CopyButton from './CopyButton.jsx';
import Icon from './Icon.jsx';

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? 'R';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function pretty(value) {
  if (!value) return '\u2014';
  return value;
}

export default function ContactCard({ contact }) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="profile">
          <div className="profile__head">
            <div className="profile__avatar" aria-hidden="true">{initials(contact.name)}</div>
            <div className="profile__info">
              <div className="profile__name">{pretty(contact.name)}</div>
              {contact.role ? <div className="profile__role">{contact.role}</div> : null}
              {contact.availability ? <div className="profile__badge">{contact.availability}</div> : null}
            </div>
          </div>

          {contact.bio ? <p className="profile__bio">{contact.bio}</p> : null}

          <div className="kv" aria-label="Quick facts">
            <div className="kv__row">
              <span className="kv__label">Email</span>
              <div className="row">
                <span className="kv__value">{pretty(contact.email)}</span>
                {contact.email ? <CopyButton value={contact.email} label="Copy" /> : null}
              </div>
            </div>

            <div className="kv__row">
              <span className="kv__label">Phone</span>
              <div className="row">
                <span className="kv__value">{pretty(contact.phone)}</span>
                {contact.phone ? <CopyButton value={contact.phone} label="Copy" /> : null}
              </div>
            </div>

            <div className="kv__row">
              <span className="kv__label">Location</span>
              <span className="kv__value">{pretty(contact.location)}</span>
            </div>
          </div>

          <div className="pills">
            <a className="btn btn--primary pill" href="#message">
              <Icon name="mail" />
              Message
            </a>
            <a
              className="btn pill"
              href={contact.phone ? `tel:${contact.phone}` : '#'}
              onClick={(e) => { if (!contact.phone) e.preventDefault(); }}
            >
              <Icon name="phone" />
              Call
            </a>
          </div>

          {Array.isArray(contact.skills) && contact.skills.length > 0 ? (
            <div className="skills" aria-label="Skills">
              {contact.skills.map((s) => (
                <span key={s} className="skill">{s}</span>
              ))}
            </div>
          ) : null}

          {(contact.website || contact.resumeUrl) ? (
            <div className="linkRow" aria-label="Links">
              {contact.website ? (
                <a className="linkChip" href={contact.website} target="_blank" rel="noreferrer">
                  <Icon name="link" />
                  Website
                </a>
              ) : null}
              {contact.resumeUrl ? (
                <a className="linkChip" href={contact.resumeUrl} target="_blank" rel="noreferrer">
                  <Icon name="file" />
                  Resume
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
