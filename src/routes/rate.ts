import { Router } from "express";
import { authenticateJwt } from '../middlewares/passport';

import { getRateById, createRate, updateRate, removeRate } from "../controllers/rate.controller";;

const rateRoute = Router();

rateRoute.get('/rate/:id', authenticateJwt, async (req, res) => {
    const resData = await getRateById(req);
    res.json(resData);
});

rateRoute.post('/rate', authenticateJwt, async (req, res) => {
    const resData = await createRate(req);
    res.json(resData);
});

rateRoute.put('/rate', authenticateJwt, async (req, res) => {
    const resData = await updateRate(req);
    res.json(resData);
});

rateRoute.delete('/rate/:id', authenticateJwt, async (req, res) => {
    const resData = await removeRate(req);
    res.json(resData);
});

export default rateRoute;