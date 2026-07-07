import Logo from './Logo.jsx';
import Ticker from './Ticker.jsx';

export default function Footer({ contact }) {
  const year = new Date().getFullYear();
  const builderName = contact?.name || 'you';

  return (
    <footer className="footer">
      <div className="container container--edge footer__inner">
        <div className="footer__brand" aria-label="App logo">
          <Logo size={18} className="footer__logo" title="Connect" />
          <span className="footer__brandText">Connect</span>
        </div>
        <div>&copy; {year} &middot; Built by {builderName}</div>
      </div>

      <div className="container container--edge footer__ticker">
        <Ticker text="Thanks for visiting &bull; Connect on LinkedIn &bull; Message anytime" speedSeconds={140} />
      </div>
    </footer>
  );
}
