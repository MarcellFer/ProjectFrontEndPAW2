// import React mengimpor modul React dari pustaka react.
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// { Suspense } mengimpor komponen Suspense dari pustaka React. Suspense digunakan untuk menunda rendering komponen hingga data atau kode yang diperlukan telah siap.
import React, { Suspense } from "react";

// Biasanya, Suspense digunakan bersama React.lazy() untuk mendukung pemuatan (loading) komponen secara dinamis (lazy loading).
// Import Component
const Home = React.lazy(() => import("./components/Home"));
const KategoriMakananList = React.lazy(() => import("./components/KategoriMakanan/List"));
const KategoriMakananCreate = React.lazy(() => import("./components/KategoriMakanan/Create"));
const KategoriMakananEdit = React.lazy(() => import("./components/KategoriMakanan/Edit"));
const AsalMakananList = React.lazy(() => import("./components/AsalMakanan/List"));
const AsalMakananCreate = React.lazy(() => import("./components/AsalMakanan/Create"));
const AsalMakananEdit = React.lazy(() => import("./components/AsalMakanan/Edit"));
const ResepList = React.lazy(() => import("./components/Resep/List"));
const ResepCreate = React.lazy(() => import("./components/Resep/Create"));
const ResepEdit = React.lazy(() => import("./components/Resep/Edit"));


function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Navbar
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/kategoriMakanan">
            Kategori Makanan
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/asalMakanan">
            Asal Makanan
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/resep">
            Resep
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto"></ul>
    </div>
  </div>
</nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategoriMakanan" element={<KategoriMakananList />} />
          <Route path="/kategoriMakanan/create" element={<KategoriMakananCreate />} />
          <Route path="/kategoriMakanan/edit/:id" element={<KategoriMakananEdit />} />
          <Route path="/asalMakanan" element={<AsalMakananList />} />
          <Route path="/asalMakanan/create" element={<AsalMakananCreate />} />
          <Route path="/asalMakanan/edit/:id" element={<AsalMakananEdit />} />
          <Route path="/resep" element={<ResepList />} />
          <Route path="/resep/create" element={<ResepCreate />} />
          <Route path="/resep/edit/:id" element={<ResepEdit />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;