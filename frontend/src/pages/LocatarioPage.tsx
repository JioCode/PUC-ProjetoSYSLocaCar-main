import React, { useEffect, useState } from "react";
import { api } from "../services/api.ts";
import { Table, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Locatario {
  id: number;
  nomeLocatario: string;
  cpfCnpj: string;
  nomeCondutor: string;
  cnhCondutor: string;
  telefone: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  logradouro: string;
  estado: string;
  cidade: string;
}

const LocatarioPage: React.FC = () => {
  const [locatarios, setLocatarios] = useState<Locatario[]>([]);
  const [novoLocatario, setNovoLocatario] = useState<Partial<Locatario>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    carregarLocatarios();
  }, []);

  // Carrega os locatários do backend
  const carregarLocatarios = () => {
    api.get("/locatarios")
      .then((response) => setLocatarios(response.data))
      .catch((error) => console.error("Erro ao buscar locatários", error));
  };

  // Salva um novo locatário ou atualiza um existente
  const salvarLocatario = () => {
    if (!novoLocatario.nomeLocatario || !novoLocatario.cpfCnpj) {
      setErrorMessage("Os campos Nome e CPF/CNPJ são obrigatórios.");
      return;
    }

    const metodo = novoLocatario.id ? "put" : "post";
    const url = novoLocatario.id ? `/locatarios/${novoLocatario.id}` : "/locatarios";

    api[metodo](url, novoLocatario)
      .then(() => {
        carregarLocatarios();
        limparFormulario();
      })
      .catch((error) => {
        console.error("Erro ao salvar locatário", error);
        setErrorMessage("Erro ao salvar locatário. Tente novamente.");
      });
  };

  // Exclui um locatário pelo ID
  const excluirLocatario = (id: number) => {
    api.delete(`/locatarios/${id}`)
      .then(() => carregarLocatarios())
      .catch((error) => console.error("Erro ao excluir locatário", error));
  };

  // Preenche o formulário para edição
  const editarLocatario = (locatario: Locatario) => {
    setNovoLocatario(locatario);
  };

  // Limpa o formulário
  const limparFormulario = () => {
    setNovoLocatario({});
    setErrorMessage("");
  };

  return (
    <div className="container mt-4 p-4 bg-dark text-light rounded">
      <h2 className="mb-4 text-primary">Gestão de Locatários</h2>

      {/* Exibe mensagem de erro */}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Formulário */}
      <Form>
        <Row className="mb-3">
          {/* Primeira Coluna */}
          <Col md={6}>
            <Form.Label>Nome do Locatário:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.nomeLocatario || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, nomeLocatario: e.target.value })}
            />

            <Form.Label>CPF/CNPJ:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.cpfCnpj || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, cpfCnpj: e.target.value })}
            />

            <Form.Label>Nome do Condutor:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.nomeCondutor || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, nomeCondutor: e.target.value })}
            />

            <Form.Label>CNH do Condutor:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.cnhCondutor || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, cnhCondutor: e.target.value })}
            />

            <Form.Label>Telefone de Contato:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.telefone || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, telefone: e.target.value })}
            />

            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              value={novoLocatario.email || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, email: e.target.value })}
            />
          </Col>

          {/* Segunda Coluna */}
          <Col md={6}>
            <Form.Label>CEP:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.cep || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, cep: e.target.value })}
            />

            <Form.Label>Rua:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.rua || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, rua: e.target.value })}
            />

            <Form.Label>Número:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.numero || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, numero: e.target.value })}
            />

            <Form.Label>Logradouro:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.logradouro || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, logradouro: e.target.value })}
            />

            <Form.Label>Estado:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.estado || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, estado: e.target.value })}
            />

            <Form.Label>Cidade:</Form.Label>
            <Form.Control
              type="text"
              value={novoLocatario.cidade || ""}
              onChange={(e) => setNovoLocatario({ ...novoLocatario, cidade: e.target.value })}
            />
          </Col>
        </Row>

        {/* Botões do CRUD */}
        <div className="mb-3">
          <Button variant="success" onClick={salvarLocatario} className="me-2">Salvar</Button>
          <Button variant="danger" onClick={limparFormulario} className="me-2">Cancelar</Button>
        </div>
      </Form>

      {/* Tabela de Locatários */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {locatarios.map((locatario) => (
            <tr key={locatario.id}>
              <td>{locatario.id}</td>
              <td>{locatario.nomeLocatario}</td>
              <td>{locatario.cpfCnpj}</td>
              <td>{locatario.telefone}</td>
              <td>{locatario.email}</td>
              <td>
                <Button variant="warning" onClick={() => editarLocatario(locatario)} className="me-2">
                  <FaEdit /> Editar
                </Button>
                <Button variant="danger" onClick={() => excluirLocatario(locatario.id)}>
                  <FaTrash /> Excluir
                </Button>
              </td>
            </tr>
          ))}
          {!locatarios.length && (
            <tr>
              <td colSpan={6} className="text-center">Nenhum locatário encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default LocatarioPage;
