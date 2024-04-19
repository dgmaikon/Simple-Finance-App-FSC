import { PostgresGetUserByIdReposity } from "../repositories/postgres/get-user-by-id.js";

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdReposity = new PostgresGetUserByIdReposity();

        const user = await getUserByIdReposity.execute(userId);

        return user;
    }
}
