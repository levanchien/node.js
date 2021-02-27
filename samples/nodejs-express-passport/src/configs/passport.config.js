const authService = require('../services/auth/auth.service');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const { ExtractJwt } = require('passport-jwt');

const jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

/* This handler is used to validate jwt */
jwtStrategyHandler = (jwt_payload, done) => {
  const user = authService.findUser(jwt_payload.sub);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
}
passport.use(new JwtStrategy(jwtStrategyOpts, jwtStrategyHandler));
