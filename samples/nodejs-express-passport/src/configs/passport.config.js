const authService = require('../services/auth/auth.service');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

/* How to validate jwt and after */
jwtStrategyHandler = (jwt_payload, done) => {
  const user = authService.findUser(jwt_payload.sub);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
}
passport.use(new JwtStrategy(jwtStrategyOpts, jwtStrategyHandler));

/* local strategy */
const localStrategyHandler = (email, password, done) => {
  if (email === 'admin@admin.com' && password === 'admin') {
    return done(null, { id: 1, password: 'admin', email: 'admin@admin.com' });
  }
  return done(new Error('Invalid email or password'), null);
}
passport.use(new LocalStrategy({ usernameField: 'email' }, localStrategyHandler));

/* Goi sau khi login thanh cong */
passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user);
});
/* Goi khi kiem tra route */
passport.deserializeUser((user, done) => {
  console.log('deserializeUser', user);
  done(null, user);
});
