import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '@/styles/Header.module.scss';

function Header() {
  return (
    <header>
      <div>
        <div>
          <h1>Bookstore CMS</h1>
          <nav>
            <ul>
              <li>
                <NavLink to="/">BOOKS</NavLink>
              </li>
              <li>
                <NavLink to="/categories">CATEGORIES</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <FaUserAlt />
        </div>
      </div>
    </header>
  );
}

export default Header;
