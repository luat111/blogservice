import { Router } from "express";
import { authenticateJwt } from '../middlewares/passport';

import { getCommentById, createComment, createSubComment, updateComment, removeComment } from "../controllers/comment.controller";;

const commentRoute = Router();

commentRoute.get('/comment/:id', authenticateJwt, async (req, res) => {
    const resData = await getCommentById(req);
    res.json(resData);
});

commentRoute.post('/comment', authenticateJwt, async (req, res) => {
    const resData = await createComment(req);
    res.json(resData);
});

commentRoute.post('/comment/sub', authenticateJwt, async (req, res) => {
    const resData = await createSubComment(req);
    res.json(resData);
});

commentRoute.put('/comment', authenticateJwt, async (req, res) => {
    const resData = await updateComment(req);
    res.json(resData);
});

commentRoute.delete('/comment/:id', authenticateJwt, async (req, res) => {
    const resData = await removeComment(req);
    res.json(resData);
});


export default commentRoute;