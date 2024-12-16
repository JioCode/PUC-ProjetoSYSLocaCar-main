"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleted = exports.update = exports.researchId = exports.researchAll = exports.create = void 0;
const client_1 = require("@prisma/client");
const TratamentoErros_1 = require("../utils/TratamentoErros");
const prisma = new client_1.PrismaClient();
//********************************************************************************************* */
const create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, celular, cpf } = request.body; // Adicionando o 'cpf' no body
    try {
        // Verificação para garantir que os campos obrigatórios estão presentes
        if (!nome || !email || !celular || !cpf) {
            return response.status(400).json({
                error: 'Campos obrigatórios: nome, email, celular, cpf'
            });
        }
        const result = yield prisma.cliente.create({
            data: {
                nome: nome,
                email: email,
                celular: celular,
                cpf: cpf
            }
        });
        return response.status(201).json({
            message: "Cliente criado com sucesso",
            cliente: result
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
        else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
});
exports.create = create;
//********************************************************************************************* */
const researchAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.cliente.findMany({});
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
        else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
});
exports.researchAll = researchAll;
//********************************************************************************************* */
const researchId = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.params.email;
    try {
        const result = yield prisma.cliente.findUnique({
            where: {
                email: email
            }
        });
        if (!result) {
            return response.status(404).json({
                error: 'Cliente não encontrado'
            });
        }
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
        else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
});
exports.researchId = researchId;
//********************************************************************************************* */
const update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const { nome, email, celular, cpf } = request.body; // Adicionando o 'cpf' no body
    try {
        // Verificação para garantir que os campos obrigatórios estão presentes
        if (!nome || !email || !celular || !cpf) {
            return response.status(400).json({
                error: 'Campos obrigatórios: nome, email, celular, cpf'
            });
        }
        const result = yield prisma.cliente.update({
            where: { id: Number(id) },
            data: {
                nome: nome,
                email: email,
                celular: celular,
                cpf: cpf // Garantindo que o 'cpf' seja enviado
            }
        });
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
        else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
});
exports.update = update;
//********************************************************************************************* */
const deleted = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const result = yield prisma.cliente.delete({
            where: { id: Number(id) },
        });
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
        else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
});
exports.deleted = deleted;
