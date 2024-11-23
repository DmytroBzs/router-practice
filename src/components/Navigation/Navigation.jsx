import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movie" className={getNavLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
