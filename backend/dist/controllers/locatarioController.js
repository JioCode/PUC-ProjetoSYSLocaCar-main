const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Busca todos os locatários
const getLocatarios = async (req, res) => {
  try {
    const locatarios = await prisma.locatario.findMany();
    return res.json(locatarios);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar locatários" });
  }
};

// Busca um locatário por ID
const getLocatarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const locatario = await prisma.locatario.findUnique({ where: { id: Number(id) } });
    if (!locatario) return res.status(404).json({ error: "Locatário não encontrado" });
    return res.json(locatario);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar locatário" });
  }
};

// Cria um novo locatário
const createLocatario = async (req, res) => {
  const data = req.body;
  try {
    const novoLocatario = await prisma.locatario.create({ data });
    return res.status(201).json(novoLocatario);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar locatário" });
  }
};

// Atualiza um locatário
const updateLocatario = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const locatarioAtualizado = await prisma.locatario.update({
      where: { id: Number(id) },
      data,
    });
    return res.json(locatarioAtualizado);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar locatário" });
  }
};

// Deleta um locatário
const deleteLocatario = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.locatario.delete({ where: { id: Number(id) } });
    return res.json({ message: "Locatário excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir locatário" });
  }
};

module.exports = {
  getLocatarios,
  getLocatarioById,
  createLocatario,
  updateLocatario,
  deleteLocatario,
};
