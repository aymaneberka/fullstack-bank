import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from '../services/UserService';
import UnauthorizedError from '../utils/errors/UnauthorizedError';
import UnprocessableEntityError from '../utils/errors/UnprocessableEntityError';
import ValidationError from '../utils/errors/ValidationError'; // Ajoute-le si tu as une classe validation

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
    } catch (error: any) {
      console.error('Erreur login:', error);

      // Gestion des erreurs spécifiques :
      if (
        error instanceof UnprocessableEntityError ||
        error instanceof ValidationError
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }

      if (error instanceof UnauthorizedError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
      }

      // Erreur générique sinon
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      await this._service.register(req.body);
      res.status(StatusCodes.CREATED).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error: any) {
      console.error('Erreur register:', error);

      // Erreur de validation pour register aussi
      if (
        error instanceof UnprocessableEntityError ||
        error instanceof ValidationError
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }

      if (error instanceof UnauthorizedError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }

  async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const balance = await this._service.getBalance(req.headers.authorization);
      res.status(StatusCodes.OK).json({ balance });
    } catch (error: any) {
      console.error('Erreur getBalance:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }
}

export default UserController;
