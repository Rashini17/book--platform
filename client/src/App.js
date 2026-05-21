import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Reader from "./pages/Reader";
import Bookmarks from "./pages/Bookmarks";
import Notifications from "./components/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/book/:id" element={<Reader />} />

        <Route path="/bookmarks" element={<Bookmarks />} />

        <Notifications />

      </Routes>
    </BrowserRouter>
  );
}

export default App;