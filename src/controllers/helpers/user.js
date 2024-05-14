import validator from 'validator';
import { badRequest, notFound } from './http.js';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at  least 6 characters',
    });

export const emailAlreadyInUseResponse = () =>
    badRequest({
        message: 'Password must be at  least 6 characters',
    });

export const invalidIdResponse = () =>
    badRequest({
        message: 'The Provide id is not valid',
    });

export const userNotFoundResponse = () =>
    notFound({ message: 'User not found' });

export const checkIfPasswordIsValid = (password) => password.length > 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => validator.isUUID(id);
