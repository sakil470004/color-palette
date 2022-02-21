import './App.css';
import Home from './Pages/Home/Home';
import ResponsiveAppBar from './Pages/ResponsiveAppBar/ResponsiveAppBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Bookmarks from './Pages/Bookmarks/Bookmarks';

function App() {
  return (
    <div>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/:colorId' element={<Home />}>
          </Route>
          <Route path='/' element={<Home />}>
          </Route>

          <Route path="/bookmarks" element={<Bookmarks />} >
          </Route>

        </Routes>
      </Router>

    </div>

  );
}

export default App;
