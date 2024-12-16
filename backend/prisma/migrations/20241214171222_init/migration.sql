-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "valorLocacao" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "anoModelo" DATETIME NOT NULL,
    "qtModelo" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    CONSTRAINT "Modelo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Modelo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "anoFabricacao" DATETIME NOT NULL,
    "cor" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "modeloId" INTEGER NOT NULL,
    CONSTRAINT "Veiculo_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manutencao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataManutencao" DATETIME NOT NULL,
    "valorManutencao" REAL NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    CONSTRAINT "Manutencao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContratoLocacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataLocacao" DATETIME NOT NULL,
    "dataDevolucao" DATETIME NOT NULL,
    "valorCaucao" REAL NOT NULL,
    "valorTotal" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "clienteId" INTEGER,
    CONSTRAINT "ContratoLocacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataOcorrencia" DATETIME NOT NULL,
    "valorOcorrencia" REAL NOT NULL,
    "contratoId" INTEGER NOT NULL,
    CONSTRAINT "Ocorrencia_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "ContratoLocacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "valorPago" REAL NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "contratoId" INTEGER NOT NULL,
    CONSTRAINT "Pagamento_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "ContratoLocacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ContratoVeiculos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ContratoVeiculos_A_fkey" FOREIGN KEY ("A") REFERENCES "ContratoLocacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContratoVeiculos_B_fkey" FOREIGN KEY ("B") REFERENCES "Veiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ContratoVeiculos_AB_unique" ON "_ContratoVeiculos"("A", "B");

-- CreateIndex
CREATE INDEX "_ContratoVeiculos_B_index" ON "_ContratoVeiculos"("B");
