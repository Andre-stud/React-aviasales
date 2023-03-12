import logo from './Logo.svg';
import './header-logo.scss';

function HeaderLogo() {
  return (
    <div className="header-logo">
        <p>
          <img src={logo} alt='logo'/>
        </p>
    </div>
  );
}

export default HeaderLogo;
