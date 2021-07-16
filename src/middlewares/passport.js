require('dotenv').config();

import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../entities/user';
import { getRepository } from 'typeorm';

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

export default passport;