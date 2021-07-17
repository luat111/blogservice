import { Router } from "express";

import userRoute from "./user";
import blogRoute from "./blog";
import commentRoute from "./comment";
import rateRoute from "./rate";

const route = Router();

route.get('/', (_, res) => {
    res.send('home');
})

export default [
    route,
    userRoute,
    blogRoute,
    commentRoute,
    rateRoute
];