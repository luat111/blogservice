import { ErrorResponse, SuccessResponse } from "../models/responseModel";
import { Request } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entities/comment";
import { Blog } from "../entities/blog";

export const getCommentById = async (req: Request): Promise<any> => {
    const { id = '' } = req.params;

    try {
        const comment = await getRepository(Comment).findOne({ relations: ['blog', 'user', 'childComments', 'parent'], where: { id: id } });
        if (!comment) return new ErrorResponse({ status: 500, error: 'Create failed' });

        return new SuccessResponse({ status: 200, message: 'Get comment success', data: comment });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const createComment = async (req: Request): Promise<any> => {
    const { content = '', idBlog = '' } = req.body;
    const user = req.user;

    try {
        const blog = await getRepository(Blog).findOne({ id: idBlog });
        if (!blog) return new ErrorResponse({ status: 403, error: 'Not found blog' });

        const newComment = await getRepository(Comment).create({ content, blog, user });
        const result = await getRepository(Comment).save(newComment);
        if (!result) return new ErrorResponse({ status: 500, error: 'Create failed' });

        return new SuccessResponse({ status: 200, message: 'Create success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const createSubComment = async (req: Request): Promise<any> => {
    const { content = '', idComment = '' } = req.body;
    const user = req.user;

    try {
        const comment = await getRepository(Comment).findOne({ id: idComment });
        if (!comment) return new ErrorResponse({ status: 403, error: 'Not found comment' });

        const newComment = await getRepository(Comment).create({ content, parent: comment, user });
        const result = await getRepository(Comment).save(newComment);
        if (!result) return new ErrorResponse({ status: 500, error: 'Create failed' });

        return new SuccessResponse({ status: 200, message: 'Create success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const updateComment = async (req: Request): Promise<any> => {
    const { content = '', id } = req.body;

    try {
        const comment = await getRepository(Comment).findOne({ id: id });
        if (!comment) return new ErrorResponse({ status: 403, error: 'Not found record' });

        const result = await getRepository(Comment).update(id, {
            content: content || comment.content,
            modifiedDate: new Date()
        });
        if (!result) return new ErrorResponse({ status: 500, error: 'Update failed' });

        return new SuccessResponse({ status: 200, message: 'Update success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};

export const removeComment = async (req: Request): Promise<any> => {
    const { id = '' } = req.params;

    try {
        const result = await getRepository(Comment).delete(id);
        if (!result) return new ErrorResponse({ status: 500, error: 'Delete failed' });

        return new SuccessResponse({ status: 200, message: 'Delete success', data: result });
    }
    catch (err) {
        return new ErrorResponse({ status: 500, error: 'failed', data: err });
    }
};