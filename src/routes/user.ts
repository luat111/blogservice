import { Router } from "express";
import { authenticateJwt } from '../middlewares/passport';

import { getAllUsers, signUp, signIn } from "../controllers/user.controller";;

const userRoute = Router();

userRoute.get('/user', async (_, res) => {
    const resData = await getAllUsers();
    res.json(resData);
});

userRoute.post('/user/signup', async (req, res) => {
    const resData = await signUp(req);
    res.json(resData);
});

userRoute.post('/user/signin', async (req, res) => {
    const resData = await signIn(req);
    res.json(resData);
});

userRoute.post('/user/abc',
    authenticateJwt,
    async (req, res) => {
        res.json(req.user);
    });

export default userRoute;