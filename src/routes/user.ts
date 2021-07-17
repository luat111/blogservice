import { Router } from "express";
import { authenticateJwt } from '../middlewares/passport';

import { getAllUsers, signUp, signIn, updateUser } from "../controllers/user.controller";;

const userRoute = Router();

userRoute.get('/user', authenticateJwt, async (_, res) => {
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

userRoute.put('/user', authenticateJwt, async (req, res) => {
    const resData = await updateUser(req);
    res.json(resData);
});

export default userRoute;