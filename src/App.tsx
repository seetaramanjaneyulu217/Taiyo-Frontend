import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import ChartsAndMaps from "./pages/ChartsAndMaps";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="charts-and-maps" element={<ChartsAndMaps />} />
      </Routes>
    </Layout>
  );
}

export default App;
