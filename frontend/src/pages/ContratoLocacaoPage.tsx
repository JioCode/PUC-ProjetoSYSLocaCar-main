import React, { useEffect, useState } from 'react';
import { api } from '../services/api.ts'; // Importando o Axios configurado
import { Table, Button } from 'react-bootstrap';

interface Contrato {
    id: number;
    dataLocacao: string;
    dataDevolucao: string;
    valorCaucao: number;
    valorTotal: number;
    status: string;
}

const ContratoLocacaoPage: React.FC = () => {
    const [contratos, setContratos] = useState<Contrato[]>([]);

    // Realizando a requisição ao backend quando o componente for montado
    useEffect(() => {
        api.get('/contratos')  // Requisição para a rota "/contratos" no backend
        .then((response) => {
            setContratos(response.data); // Armazenando os dados retornados na variável de estado
        })
        .catch((error) => {
            console.error('Erro ao buscar contratos', error);
        });
    }, []);

    return (
        <div className="container mt-4">
        <h2>Contrato de Locação</h2>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Data Locação</th>
                <th>Data Devolução</th>
                <th>Valor Caução</th>
                <th>Valor Total</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {contratos.map((contrato) => (
                <tr key={contrato.id}>
                <td>{contrato.id}</td>
                <td>{contrato.dataLocacao}</td>
                <td>{contrato.dataDevolucao}</td>
                <td>R$ {contrato.valorCaucao.toFixed(2)}</td>
                <td>R$ {contrato.valorTotal.toFixed(2)}</td>
                <td>{contrato.status}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        <Button variant="primary">Novo Contrato</Button>
        </div>
    );
};

export default ContratoLocacaoPage;
