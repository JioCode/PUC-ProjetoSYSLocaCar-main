import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { ErrorRequest } from '../utils/TratamentoErros';

const prisma = new PrismaClient();

//********************************************************************************************* */
export const create = async (request: Request, response: Response) => {
    const { nome, email, celular, cpf } = request.body;  // Adicionando o 'cpf' no body

    try {
        // Verificação para garantir que os campos obrigatórios estão presentes
        if (!nome || !email || !celular || !cpf) {
            return response.status(400).json({
                error: 'Campos obrigatórios: nome, email, celular, cpf'
            });
        }

        const result = await prisma.cliente.create({
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
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        } else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
}

//********************************************************************************************* */
export const researchAll = async (request: Request, response: Response) => {
    try {
        const result = await prisma.cliente.findMany({});
        response.status(200).json(result);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        } else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
}

//********************************************************************************************* */
export const researchId = async (request: Request, response: Response) => {
    const email = request.params.email;

    try {
        const result = await prisma.cliente.findUnique({
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
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        } else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
}

//********************************************************************************************* */
export const update = async (request: Request, response: Response) => {
    const id = request.params.id;
    const { nome, email, celular, cpf } = request.body;  // Adicionando o 'cpf' no body

    try {
        // Verificação para garantir que os campos obrigatórios estão presentes
        if (!nome || !email || !celular || !cpf) {
            return response.status(400).json({
                error: 'Campos obrigatórios: nome, email, celular, cpf'
            });
        }

        const result = await prisma.cliente.update({
            where: { id: Number(id) },
            data: {
                nome: nome,
                email: email,
                celular: celular,
                cpf: cpf  // Garantindo que o 'cpf' seja enviado
            }
        });

        response.status(200).json(result);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        } else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
}

//********************************************************************************************* */
export const deleted = async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const result = await prisma.cliente.delete({
            where: { id: Number(id) },
        });

        response.status(200).json(result);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        } else {
            response.status(500).json({
                error: 'Erro interno ao processar a requisição'
            });
        }
    }
}
