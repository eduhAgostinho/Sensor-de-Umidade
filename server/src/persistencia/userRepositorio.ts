import { User } from "../entidades/user";
import { UserModel } from "./userModel";
import { hash } from 'bcrypt';

export class UserRepositorio {
    static async newUser(user: User): Promise<User> {
        const hashpassword = await hash(user.password, 10);
        user.password = hashpassword;
        return UserModel.create(user);
    }

    static async user(username: string): Promise<User | null> {
        return await UserModel.findOne().where({ username: username }).exec();
    }

}