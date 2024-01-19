import { NextFunction, Request, Response } from "express";
import { signupDTO } from "../dtos/signup.dto";


class AuthMiddleware {
  // signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      signupDTO.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
      // Despues, no olvidar
    }
  }

  //   login
  async login(req: Request, res: Response, next: NextFunction) {}
}

export const authMiddleware = new AuthMiddleware();
