import { NextFunction, Request, Response } from "express";
import { signupDTO } from "../dtos/signup.dto";
import { loginDTO } from "../dtos/login.dto";


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
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      loginDTO.parse(req.body);
      next();
    } catch (error) {
      // Despues, no olvidar
    }
  }
}

export const authMiddleware = new AuthMiddleware();
