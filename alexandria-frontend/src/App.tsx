import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './pages/AddItem.tsx';
import EditItem from './pages/EditItem.tsx';
import ViewItem from './pages/ViewItem.tsx';

function App() {


  return (
    <div className="App bg-warning">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/view-item/:id" element={<ViewItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />
      </Routes>
    </Router>  
    </div>
  );
}

export default App;
