import User, {UserAttributes, UserType} from "../models/user.js";

export async function findById(id: number): Promise<UserAttributes | null> {
    return User.findByPk(id);
}

export async function findByNickname(nickname: string): Promise<UserAttributes | null> {
    return User.findOne({where: {nickname}});
}

export async function createUser(user: UserType): Promise<string> {
    const {nickname, password} = user;
    return User.create({
        nickname: nickname,
        password: password,
    }).then((result)=> result.dataValues.id.toString());
}

export async function deleteUser(id: number){
    return User.findByPk(id).then((user: User | null) => {
        return user!.destroy();
    });
}