import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{ marginRight: '10px' }}>Search Candidates</Link>
      <Link to="/SavedCandidates">Saved Candidates</Link>
    </nav>
  );
};

export default Navbar;



