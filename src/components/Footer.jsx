import Logo from './Logo.jsx';

export default function Footer({ contact }) {
  const year = new Date().getFullYear();
  const builderName = contact?.name || 'you';

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand" aria-label="App logo">
          <Logo size={16} className="footer__logo" title="Ritik Kumar" />
          <span className="footer__brandText">{builderName}</span>
        </div>
        <span>&copy; {year}</span>
      </div>
    </footer>
  );
}
