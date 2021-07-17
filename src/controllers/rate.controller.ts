import { ErrorResponse, SuccessResponse } from "../models/responseModel";
import { Request } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Rate } from "../entities/rate";
import { Blog } from "../entities/blog";
import { User } from "../entities/user";

export const getRateById = async (req: Request): Promise<any> => {
    const { id = '' } = req.params;

    try {
        const rate = await getRepository(Rate).findOne({ relations: ['user', 'blog'], where: { id: id } });
        if (!rate) return new ErrorResponse({ status: 500, error: 'Create failed' });

        return new SuccessResponse({ status: 200, message: 'Get rate success', data: rate });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const createRate = async (req: Request): Promise<any> => {
    const { rating = '', idBlog = '', idUser = '' } = req.body;
    const user = req.user;

    try {
        const blog = await getRepository(Blog).findOne({ id: idBlog });
        if (!blog) return new ErrorResponse({ status: 403, error: 'Not found blog' });


        const checkExist = await getRepository(Rate).findOne({
            relations: ['user', 'blog'],
            where: {
                user: { id: idUser },
                blog: { id: idBlog }
            }
        })
        if (checkExist) return new ErrorResponse({ status: 422, error: 'You have rate this blog' });

        const newRate = await getRepository(Rate).create({ rating, blog, user });

        const result = await getRepository(Rate).save(newRate);
        if (!result) return new ErrorResponse({ status: 500, error: 'Create failed' });

        return new SuccessResponse({ status: 200, message: 'Create success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const updateRate = async (req: Request): Promise<any> => {
    const { rating = '', id } = req.body;

    try {
        const rate = await getRepository(Rate).findOne({ id: id });
        if (!rate) return new ErrorResponse({ status: 403, error: 'Not found blog' });

        const result = await getRepository(Rate).update(id, { rating: rating || rate.rating });
        if (!result) return new ErrorResponse({ status: 500, error: 'Update failed' });

        return new SuccessResponse({ status: 200, message: 'Update success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const removeRate = async (req: Request): Promise<any> => {
    const { id = '' } = req.params;

    try {
        const result = await getRepository(Rate).delete(id);
        if (!result) return new ErrorResponse({ status: 500, error: 'Delete failed' });

        return new SuccessResponse({ status: 200, message: 'Delete success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};
