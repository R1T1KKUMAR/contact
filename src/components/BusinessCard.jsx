import CopyButton from './CopyButton.jsx';
import VCardButton from './VCardButton.jsx';
import Icon from './Icon.jsx';

function initials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? 'R';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function BusinessCard({ contact }) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="biz">
          <div className="biz__avatar" aria-hidden="true">
            {initials(contact.name)}
          </div>

          <div className="biz__main">
            <div className="biz__name">{contact.name}</div>
            <div className="biz__role">{contact.role}</div>
            {contact.availability ? <div className="biz__availability">{contact.availability}</div> : null}
          </div>
        </div>

        {contact.bio ? <p className="biz__bio">{contact.bio}</p> : null}

        {Array.isArray(contact.skills) && contact.skills.length > 0 ? (
          <div className="chips" aria-label="Skills">
            {contact.skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        ) : null}

        <div style={{ height: 12 }} />

        <div className="kv">
          <div className="kv__row">
            <div className="kv__label">Email</div>
            <div className="row">
              <div className="kv__value">{contact.email || '—'}</div>
              {contact.email ? <CopyButton value={contact.email} label="Copy" /> : null}
            </div>
          </div>

          <div className="kv__row">
            <div className="kv__label">Phone</div>
            <div className="row">
              <div className="kv__value">{contact.phone || '—'}</div>
              {contact.phone ? <CopyButton value={contact.phone} label="Copy" /> : null}
            </div>
          </div>

          <div className="kv__row">
            <div className="kv__label">Location</div>
            <div className="kv__value">{contact.location || '—'}</div>
          </div>
        </div>

        <div style={{ height: 12 }} />

        <div className="pills">
          <a
            className="btn btn--primary pill"
            href={contact.email ? `mailto:${contact.email}` : '#'}
            onClick={(e) => {
              if (!contact.email) e.preventDefault();
            }}
          >
            <Icon name="mail" />
            Email
          </a>

          <a
            className="btn pill"
            href={contact.phone ? `tel:${contact.phone}` : '#'}
            onClick={(e) => {
              if (!contact.phone) e.preventDefault();
            }}
          >
            <Icon name="phone" />
            Call
          </a>

          <VCardButton contact={contact} className="btn pill" />

          <button type="button" className="btn pill" onClick={() => window.print()}>
            <Icon name="print" />
            Print
          </button>
        </div>

        {(contact.website || contact.github || contact.resumeUrl) && (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: "8px" }} className="hint">
            {contact.website ? (
              <span>
                Website: <a href={contact.website} target="_blank" rel="noreferrer">{contact.website}</a>
              </span>
            ) : null}
            {contact.github ? (
              <span>
                GitHub: <a href={contact.github} target="_blank" rel="noreferrer">{contact.github}</a>
              </span>
            ) : null}
            {contact.resumeUrl ? (
              <span>
                Resume: <a href={contact.resumeUrl} target="_blank" rel="noreferrer">open</a>
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
