import React from 'react';
import {NavLink} from 'react-router-dom';

const Home = () =>
  <div className="home">
    <nav>
      <ul>
        <li>
          <NavLink to="/posts">
            <h1>Welcome to the simple blog</h1>
            <h1>(click to enter)</h1>
          </NavLink>
        </li>
      </ul>
    </nav> 
  </div>

export default Home;
