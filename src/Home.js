import React from 'react';
import {NavLink} from 'react-router-dom';

const Home = () =>
  <div>
    <nav>
      <ul>
        <li>
          <NavLink to="/posts"><h1>Post list</h1></NavLink>
        </li>
      </ul>
    </nav> 
  </div>

export default Home;
