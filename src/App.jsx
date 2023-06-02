import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Home, CreatePost } from "./page";

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-gradient-to-r from-cyan-200 to-blue-100 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <Link
        to="/create-post"
        className="font-mono font-medium bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-md"
      >
        Create
      </Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-gradient-to-r from-cyan-100 to-blue-100  min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
