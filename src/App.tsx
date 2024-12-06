import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This renders the child routes (CandidateSearch or SavedCandidates) */}
    </div>
  );
};

export default App;



