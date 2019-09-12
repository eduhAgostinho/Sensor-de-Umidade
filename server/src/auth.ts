import passport from 'passport';
import passportlocal from 'passport-local';
import passportjwt from 'passport-jwt';
import { UserRepositorio } from './persistencia/userRepositorio';
import { compare } from 'bcrypt';


const LocalStrategy = passportlocal.Strategy;

export const pass = passport;

pass.use('login', new LocalStrategy(async (user,passwd, done) => {
    const findUser = await UserRepositorio.user(user);
    console.log(findUser);
    if (findUser === null) {
        return done(undefined, false, {message:'Usuário não encontrado'});
    }
    
    if (await compare(passwd, findUser!.password) === false) {
        return done(undefined, false, {message:'Usuário ou senha inválidos'});
    }
    return done(undefined, {username:user,password:passwd});
}));

const JwtStrategy = passportjwt.Strategy;

pass.use(new JwtStrategy({
    secretOrKey: 'challengedbserver2019',
    jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (token,done) => {
        try {
            return done(undefined, token.user);
        } catch (error) {
            done(error);
        }
    })
);