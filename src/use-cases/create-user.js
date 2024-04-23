import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { PostgresCreateUserRepository } from "../repositories/postgres/create-users.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { EmailAlreadyInUserError } from "../erros/users.js";

export class CreateUserUseCase {
    async execute(CreateUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                CreateUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUserError(CreateUserParams.email);
        }

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

        console.log("user", user);
        //chamar o repositorio
        //1º opção
        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        //2° opção
        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
