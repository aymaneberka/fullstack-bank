import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';
import UnauthorizedError from '../utils/errors/UnauthorizedError';
import UnprocessableEntityError from '../utils/errors/UnprocessableEntityError';
import ValidationError from '../utils/errors/ValidationError';
import NotFoundError from '../utils/errors/NotFoundError';
import BadRequestError from '../utils/errors/BadRequestError';
import { JsonWebTokenError } from 'jsonwebtoken';

class UserController {
  private _service: UserService;

  constructor() {
    this._service = new UserService();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const userData = await this._service.login(req.body);
      res.status(StatusCodes.OK).json(userData);
      return;
    } catch (error: any) {
      console.error('Erreur login:', error);

      if (error instanceof UnprocessableEntityError) {
        res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: error.message });
        return;
      }

      if (error instanceof BadRequestError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
      }

      if (error instanceof ValidationError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
      }

      if (error instanceof UnauthorizedError) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        return;
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor.' });
      return;
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      await this._service.register(req.body);
      res.status(StatusCodes.CREATED).json({ message: 'Usuário registrado com sucesso.' });
      return;
    } catch (error: any) {
      console.error('Erreur register:', error);

      if (error instanceof UnprocessableEntityError) {
        res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: error.message });
        return;
      }

      if (error instanceof BadRequestError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
      }

      if (error instanceof ValidationError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
      }

      if (error instanceof UnauthorizedError) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        return;
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor.' });
      return;
    }
  }

  async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const balance = await this._service.getBalance(req.headers.authorization);
      res.status(StatusCodes.OK).json({ balance });
      return;
    } catch (error: any) {
      console.error('Erreur getBalance:', error);

      if (error instanceof UnprocessableEntityError) {
        res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: error.message });
        return;
      }

      if (error instanceof ValidationError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
      }

      if (error instanceof BadRequestError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
      }

      if (error instanceof UnauthorizedError) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
        return;
      }

      if (error instanceof JsonWebTokenError) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token inválido ou expirado.' });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        return;
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor.' });
      return;
    }
  }
}

export default UserController;
