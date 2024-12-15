import React, { useEffect, useState } from "react";
import { api } from "../services/api.ts";
import { Table, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
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
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState(false); // Estado para o loader

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
        // Validação de campos
        if (
            !novoContrato.dataLocacao ||
            !novoContrato.dataDevolucao ||
            !novoContrato.valorCaucao ||
            novoContrato.valorCaucao <= 0 ||
            !novoContrato.valorTotal ||
            novoContrato.valorTotal <= 0
        ) {
            setErrorMessage("Preencha todos os campos corretamente. Valores devem ser positivos.");
            return;
        }

        setLoading(true); // Ativa loader

        // Ajusta datas no formato ISO
        const contratoFormatado = {
            ...novoContrato,
            dataLocacao: new Date(novoContrato.dataLocacao!).toISOString(),
            dataDevolucao: new Date(novoContrato.dataDevolucao!).toISOString(),
        };

        api.post("/contratos", contratoFormatado)
            .then(() => {
                carregarContratos();
                limparFormulario();
                setErrorMessage("");
            })
            .catch((error) => {
                console.error("Erro ao salvar contrato", error);
                setErrorMessage("Erro ao salvar contrato. Tente novamente.");
            })
            .finally(() => setLoading(false)); // Desativa loader
    };

    // Exclui um contrato pelo ID
    const excluirContrato = (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir este contrato?")) return;

        api.delete(`/contratos/${id}`)
            .then(() => carregarContratos())
            .catch((error) => {
                console.error("Erro ao excluir contrato", error);
                setErrorMessage("Erro ao excluir contrato. Tente novamente.");
            });
    };

    // Limpa o formulário de contrato
    const limparFormulario = () => {
        setNovoContrato({});
    };

    // Formatação de datas para exibição
    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString("pt-BR");
    };

    return (
        <div className="container mt-4 p-4 bg-dark text-light rounded" style={{ backgroundColor: "#212529" }}>
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
                            onClick={salvarContrato}
                            disabled={
                                loading ||
                                !novoContrato.dataLocacao ||
                                !novoContrato.dataDevolucao ||
                                !novoContrato.valorCaucao ||
                                !novoContrato.valorTotal
                            }
                        >
                            {loading ? <Spinner size="sm" animation="border" /> : "Salvar"}
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
                            <td>{formatarData(contrato.dataLocacao)}</td>
                            <td>{formatarData(contrato.dataDevolucao)}</td>
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
