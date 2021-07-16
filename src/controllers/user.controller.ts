import { Request, Response } from "express";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ErrorResponse, SuccessResponse } from "../models/responseModel";
import { User } from "../entities/user";
import { getRepository } from "typeorm";

export const getAllUsers = async () => {
    const users = await getRepository(User).find({ relations: ['blogs'] });
    return new SuccessResponse({ status: 200, message: 'Get list user success', data: users });
};

export const signUp = async (req: Request): Promise<any> => {
    const { fullname, username, password, email, DoB, phone } = req.body;

    if (!password || password === '') return new ErrorResponse({ status: 422, error: 'Not correct password' });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const checkExist = await getRepository(User).findOne({ where: { username: username } });
    if (checkExist) return new ErrorResponse({ status: 422, error: 'Username existed' });

    const newUser = await getRepository(User).create({ fullname, username, password: hashedPassword, email, DoB, phone });

    const result = await getRepository(User).save(newUser);
    if (!result) return new ErrorResponse({ status: 500, error: 'Signup failed' })

    return new SuccessResponse({ status: 200, message: 'Signup success', data: result });
}

export const signIn = async (req: Request): Promise<any> => {
    const { username, password } = req.body;

    if (!username || !password) return new ErrorResponse({ status: 422, error: 'Invalid username/password' });

    const user = await getRepository(User).findOne({ where: { username: username } });
    if (!user) return new ErrorResponse({ status: 401, error: 'Not found' });

    const hashedPassword = user?.password || '';
    const checkPass = await bcrypt.compare(password, hashedPassword);
    if (!checkPass) return new ErrorResponse({ status: 401, error: 'Wrong password' });

    const secretKey = process.env.SECRETKEY || '';
    const token = jwt.sign({ userId: user.id }, secretKey);

    return new SuccessResponse({ status: 200, message: 'Signin success', data: token })

}