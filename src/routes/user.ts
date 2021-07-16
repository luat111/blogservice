import { Router } from "express";

const userRoute = Router();

userRoute.get('/user', (_, res) => {
    res.send('user');
})

export default userRoute;