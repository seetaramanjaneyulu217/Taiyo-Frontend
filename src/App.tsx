import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ContactPage from "./pages/ContactPage";
import ChartsAndMaps from "./pages/ChartsAndMaps";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="charts-and-maps" element={<ChartsAndMaps />} />
      </Routes>
    </Layout>
  );
}

export default App;
