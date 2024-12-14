import React, { useEffect, useState } from "react";
import { api } from "../services/api.ts";
import { Table, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

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
    const [novoContrato, setNovoContrato] = useState<Partial<Contrato>>({});
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        carregarContratos();
    }, []);

    // Carrega os contratos do backend
    const carregarContratos = () => {
        api.get("/contratos")
            .then((response) => setContratos(response.data))
            .catch((error) => console.error("Erro ao buscar contratos", error));
    };

    // Salva um novo contrato no banco
    const salvarContrato = () => {
        // Verificação de campos obrigatórios
        if (!novoContrato.dataLocacao || !novoContrato.dataDevolucao || !novoContrato.valorCaucao || !novoContrato.valorTotal) {
            setErrorMessage("Todos os campos devem ser preenchidos.");
            return;
        }

        api.post("/contratos", novoContrato)
            .then(() => {
                carregarContratos();
                limparFormulario();
                setErrorMessage(""); // Limpar mensagem de erro se o contrato for salvo com sucesso
            })
            .catch((error) => {
                console.error("Erro ao salvar contrato", error);
                setErrorMessage("Erro ao salvar contrato. Tente novamente.");
            });
    };

    // Exclui um contrato pelo ID
    const excluirContrato = (id: number) => {
        api.delete(`/contratos/${id}`)
            .then(() => carregarContratos())
            .catch((error) => console.error("Erro ao excluir contrato", error));
    };

    // Limpa o formulário de contrato
    const limparFormulario = () => {
        setNovoContrato({});
        setShowModal(false);
    };

    return (
        <div className="container mt-4 p-4 bg-dark text-light rounded">
            <h2 className="mb-4 text-primary">Contrato de Locação</h2>

            {/* Exibe uma mensagem de erro se houver */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {/* Formulário Principal */}
            <Form>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Label>Data de Locação:</Form.Label>
                        <Form.Control
                            type="date"
                            value={novoContrato.dataLocacao || ""}
                            onChange={(e) =>
                                setNovoContrato({ ...novoContrato, dataLocacao: e.target.value })
                            }
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Data Prevista para Devolução:</Form.Label>
                        <Form.Control
                            type="date"
                            value={novoContrato.dataDevolucao || ""}
                            onChange={(e) =>
                                setNovoContrato({ ...novoContrato, dataDevolucao: e.target.value })
                            }
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Valor Caução (R$):</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0,00"
                            value={novoContrato.valorCaucao || ""}
                            onChange={(e) =>
                                setNovoContrato({ ...novoContrato, valorCaucao: Number(e.target.value) })
                            }
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Label>Valor Total (R$):</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0,00"
                            value={novoContrato.valorTotal || ""}
                            onChange={(e) =>
                                setNovoContrato({ ...novoContrato, valorTotal: Number(e.target.value) })
                            }
                        />
                    </Col>
                    <Col md={4} className="d-flex align-items-end">
                        <Button 
                            variant="primary" 
                            onClick={() => salvarContrato()} 
                            disabled={!novoContrato.dataLocacao || !novoContrato.dataDevolucao || !novoContrato.valorCaucao || !novoContrato.valorTotal}
                        >
                            Salvar
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Tabela de Contratos */}
            <Table striped bordered hover variant="dark" className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data Locação</th>
                        <th>Data Devolução</th>
                        <th>Valor Caução (R$)</th>
                        <th>Valor Total (R$)</th>
                        <th>Ações</th>
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
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => excluirContrato(contrato.id)}
                                    className="me-2"
                                >
                                    <FaTrash /> Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {!contratos.length && (
                        <tr>
                            <td colSpan={6} className="text-center">
                                Nenhum contrato encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ContratoLocacaoPage;
