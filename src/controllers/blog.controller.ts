import { ErrorResponse, SuccessResponse } from "../models/responseModel";
import { Request } from "express";
import { getRepository } from "typeorm";
import { Blog } from "../entities/blog";

export const getAllBlogs = async (): Promise<any> => {
    try {
        const blogs = await getRepository(Blog).find({ relations: ['user', 'comments', 'rates'] });
        return new SuccessResponse({ status: 200, message: 'Get list blog success', data: blogs });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const getBlogById = async (req: Request): Promise<any> => {
    const { id = '' } = req.params;

    try {
        const blog = await getRepository(Blog).findOne({ relations: ['user', 'comments', 'rates'], where: { id: id } });

        if (!blog) return new ErrorResponse({ status: 403, error: 'Not found record' });
        return new SuccessResponse({ status: 200, message: 'Get blog success', data: blog });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const createBlog = async (req: Request): Promise<any> => {
    const { title = '', content = '' } = req.body;
    const user = req.user;

    try {
        if (!user) return new ErrorResponse({ status: 401, error: 'Unauthorized' });

        const newBlog = await getRepository(Blog).create({ title, content, user });
        const result = await getRepository(Blog).save(newBlog);
        if (!result) return new ErrorResponse({ status: 500, error: 'Create failed' });

        return new SuccessResponse({ status: 200, message: 'Create blog success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const updateBlog = async (req: Request): Promise<any> => {
    const { title, content, id } = req.body;

    try {
        const blog = await getRepository(Blog).findOne({ id: id });
        if (!blog) return new ErrorResponse({ status: 403, error: 'Not found record' });

        const result = await getRepository(Blog).update(id, {
            title: title || blog.title,
            content: content || blog.content,
            modifiedDate: new Date()
        });
        if (!result) return new ErrorResponse({ status: 500, error: 'Update failed' });

        return new SuccessResponse({ status: 200, message: 'Update success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const removeBlog = async (req: Request): Promise<any> => {
    const { id } = req.params;

    try {
        const result = await getRepository(Blog).delete(id);
        if (!result) return new ErrorResponse({ status: 500, error: 'Delete failed' });

        return new SuccessResponse({ status: 200, message: 'Delete success' });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }

};