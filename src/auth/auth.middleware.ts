import { NextFunction, Request, Response } from "express";
import { signupDTO } from "../dtos/signup.dto";
import { loginDTO } from "../dtos/login.dto";
import { editUserDTO } from "../dtos/edit-me.dto"; 


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

  //   edit me
  async editMe(req: Request, res: Response, next: NextFunction) {
    try {
      editUserDTO.parse(req.body);
      next();
    } catch (error) {
      // Despues, no olvidar
    }
  }
}

export const authMiddleware = new AuthMiddleware();
