import { compare, hash } from 'bcryptjs';
import httpStatus from 'http-status';
import Joi from 'joi';
import nodemailer from 'nodemailer';
import User from '../database/models/User.model';
import IUser from '../interfaces/User.interface';
import { ErrorHandler } from '../middlewares/error.middleware';

const UserService = {
  async validateBody(body: IUser): Promise<void> {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required().min(5),
      email: Joi.string().email().required(),
      birthday: Joi.date().required(),
      controller: Joi.string().required().min(5),
    });

    const { error } = schema.validate(body);
    if (error) throw new ErrorHandler(error.message, httpStatus.BAD_REQUEST);
    const exists = await User.findOne({ where: { email: body.email } });
    if (exists) throw new ErrorHandler('Email already in use', httpStatus.UNAUTHORIZED);
  },

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new ErrorHandler('Invalid Email', httpStatus.NOT_FOUND);
    const check = await compare(password, user.password);
    if (!check) throw new ErrorHandler('Invalid Password', httpStatus.UNAUTHORIZED);
    return user;
  },

  async sendEmail(email:string) {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'felipedevnunes@gmail.com',
        pass: 'rhxststbnwhlzjiz',
      },
    });
    transport.sendMail({
      from: 'Erasmo Bacco <felipedevnunes@gmail.com>',
      to: email,
      subject: 'Bem vindo a CDR',
      text: 'Fala marciao, bem vindo a nossa nova, '
      + 'liguinha nao, MAJOR DE F1 a CDR League, e se não gostar, muda de canal, tira equipe',
    });
  },

  async createUser(
    { name, password, email, driver, admin, birthday, controller }: User,
  ): Promise<User> {
    const hashedPass = await hash(password, 10);
    const user = await User.create(
      { name, password: hashedPass, email, driver, admin, birthday, controller },
    );
    await this.sendEmail(email);
    return user;
  },

  async readUsers(): Promise<User[]> {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  },

  async logIn({ email, password }: IUser) {
    const user = await this.verifyUser(email, password);
    return user;
  },

};

export default UserService;
