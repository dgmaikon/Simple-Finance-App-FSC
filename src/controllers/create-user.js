import { CreateUserUseCase } from '../use-cases/create-user.js';
import { badRequest, created, serverError } from './helpers.js';
import { EmailAlreadyInUseError } from '../errors/users.js';

import validator from 'validator';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            //validar a requisição (campos obrigatórios, tamanho de senha e email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const passwordIsNotValid = params.password.length < 6;

            if (passwordIsNotValid) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                });
            }

            const emailIsValid = validator.isEmail(params.email);

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid email. Please provide a valid one',
                });
            }

            //chamar o use case
            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            //retornar a resposta para o usuario (status code)
            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.log(error);
            return serverError();
        }
    }
}