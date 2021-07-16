import { Router } from "express";
import userRoute from "./user";

const route = Router();

route.get('/', (_, res) => {
    res.send('home');
})

export default [route, userRoute];