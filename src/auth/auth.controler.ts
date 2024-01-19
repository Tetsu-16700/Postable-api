import { Request, Response } from "express";
import { IFieldsAuth } from "./models/auth.interfaces";
import { authService } from "./auth.service";


class AuthController {
  // Signup
  async signup(req: Request, res: Response) {
    const data: IFieldsAuth = req.body;
    const response = await authService.signup(data);
    res.status(response.code).json(response.response);
  }

  // Login
  async login(req: Request, res: Response) {}
  
  // Me
  async me(req: Request, res: Response) {}

  // Edit Me
  async editMe(req: Request, res: Response) {}

  // Delete
  async deleteMe(req: Request, res: Response) {}
}

export const authController = new AuthController();
