import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
        <h1>Bem-vindo à Página Inicial</h1>
        <p>Vá para a <Link to="/contratos">Página de Contratos</Link></p>
        </div>
    );
};

export default HomePage;
