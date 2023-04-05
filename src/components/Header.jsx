import React from 'react';
import { useDispatch } from 'react-redux';
import { FaHamburger } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { showFeatures } from '@/redux/modal/modalSlice';
import '@/styles/Header.module.scss';

function Header() {
  const dispatch = useDispatch();
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
        <button
          type="button"
          title="See features"
          onClick={() => dispatch(showFeatures())}
        >
          <FaHamburger />
        </button>
      </div>
    </header>
  );
}

export default Header;
