import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <Router>
        <Navigation />
        <Routes>
          {/* <Route path="/" element={<HomePage/>} />
          <Route path="/catalog" element={<CatalogPage/>} />
          <Route path="/contacts" element={<ContactsPage/>} /> */}
          <Route path="/admin" element={<AdminPage/>} />
        </Routes>
        {/* <Footer/> */}
    </Router>
  );
}

export default App;
