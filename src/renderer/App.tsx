import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DirectoryWatcher from './pages/DirectoryWatcher';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DirectoryWatcher />} />
      </Routes>
    </Router>
  );
}
