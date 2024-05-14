import validator from 'validator';
import { badRequest } from './http.js';

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

export const checkIfPasswordIsValid = (password) => password.length > 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
