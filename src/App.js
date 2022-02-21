import './App.css';
import Home from './Pages/Home/Home';
import ResponsiveAppBar from './Pages/ResponsiveAppBar/ResponsiveAppBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/color/:colorId" element={<Home />} >
          </Route>
          {/* <Route path="/cart" element={<Cart />} >
          </Route> */}

        </Routes>
      </Router>

    </div>

  );
}

export default App;
