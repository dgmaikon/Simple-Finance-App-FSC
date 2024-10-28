import { EmailAlreadyInUseError } from '../../errors/users.js';
import {
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    checkIfEmailIsValid,
    validateRequiredFields,
} from '../helpers/index.js';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'firstName',
                'last_name',
                'email',
                'password',
            ];

            const { ok: requiredFieldsWereProvide, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!requiredFieldsWereProvide) {
                return badRequest({
                    message: `The field ${missingField} is required.`,
                });
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password);

            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return emailAlreadyInUseResponse();
            }

            const createdUser = await this.createUserUseCase.execute(params);

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
