// CORE
import { BrowserRouter, Routes, Route } from "react-router-dom";

// STYLES
import './App.css';

// PAGES
import { Home } from './pages/Home/Home';
import { Characters } from "./pages/Characters/Characters";

// COMPONENTS
import { Header } from "./components/Header/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export { App };
