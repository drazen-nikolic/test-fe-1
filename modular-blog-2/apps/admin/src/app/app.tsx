import '../styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditPost } from './pages/EditPost';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
