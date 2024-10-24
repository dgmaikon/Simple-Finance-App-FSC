import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { EmailAlreadyInUseError } from '../../errors/users.js';

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
    }
    async execute(CreateUserParams) {
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(CreateUserParams.email);

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(CreateUserParams.email);
        }

        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(CreateUserParams.password, 10);

        const user = {
            ...CreateUserParams,
            id: userId,
            password: hashedPassword,
        };

        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}
