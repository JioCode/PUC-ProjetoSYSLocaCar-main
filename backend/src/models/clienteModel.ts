import { UUID } from "crypto"

interface Cliente {
    id : string
    nome : string,
    email : string,
    celular : string
}

let clientes : Cliente [] = []

export {Cliente, clientes}