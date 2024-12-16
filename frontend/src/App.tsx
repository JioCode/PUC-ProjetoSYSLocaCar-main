import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import HomePage from './pages/HomePage.tsx';
import ContratoLocacaoPage from './pages/ContratoLocacaoPage.tsx';
import LocatarioPage from './pages/LocatarioPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      {/* Menu de Navegação fixo no topo */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/contratos">Contratos</Nav.Link>
            <Nav.Link as={Link} to="/locatarios">Locatários</Nav.Link> {/* Adicionei o link */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Corpo do conteúdo */}
      <div style={{ marginTop: "70px" }}> {/* Adiciona margem para não cobrir o conteúdo */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contratos" element={<ContratoLocacaoPage />} />
          <Route path="/locatarios" element={<LocatarioPage />} /> {/* Nova rota */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
