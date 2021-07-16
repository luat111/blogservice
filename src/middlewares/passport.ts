require('dotenv').config();

import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { User } from '../entities/user';
import { getRepository } from 'typeorm';
import { ErrorResponse } from '../models/responseModel';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETKEY || ''
}

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await getRepository(User).findOne({ id: jwt_payload.userId });

    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }

}));

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: User, info: any) => {
        if (err) return next(err);
        if (!user) return res.json(new ErrorResponse({ status: 401, error: 'Unauthorized' }));

        req.user = user;
        next();
    })(req, res, next);
};

export default passport;