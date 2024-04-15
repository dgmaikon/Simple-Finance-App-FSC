import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { PostgresCreateUserRepository } from "../repositories/postgres/create-users.js";

export class CreateUserCase {
    async execute(CreateUserParams) {
        //TODO: verificar se o email ja esta em uso

        //gerar id do usuario
        const userId = uuidv4();

        //criptografar a senha
        const hashedPassword = await bcrypt.hash(CreateUserParams.password, 10);

        //inserir o usuario no banco de dados
        const user = {
            ...CreateUserParams,
            id: userId,
            password: hashedPassword,
        };

        //chamar o repositorio
        //1º opção
        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        //2° opção
        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}