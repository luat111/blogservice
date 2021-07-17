import { Router } from "express";
import { authenticateJwt } from '../middlewares/passport';

import { getAllBlogs, getBlogById, createBlog, updateBlog, removeBlog } from "../controllers/blog.controller";;

const blogRoute = Router();

blogRoute.get('/blog', authenticateJwt, async (_, res) => {
    const resData = await getAllBlogs();
    res.json(resData);
});

blogRoute.get('/blog/:id', authenticateJwt, async (req, res) => {
    const resData = await getBlogById(req);
    res.json(resData);
});

blogRoute.post('/blog', authenticateJwt, async (req, res) => {
    const resData = await createBlog(req);
    res.json(resData);
});

blogRoute.put('/blog', authenticateJwt, async (req, res) => {
    const resData = await updateBlog(req);
    res.json(resData);
});

blogRoute.delete('/blog', authenticateJwt, async (req, res) => {
    const resData = await removeBlog(req);
    res.json(resData);
});

export default blogRoute;