import { Request, Response } from "express";
import { IEditMe, IFieldsAuth } from "./models/auth.interfaces";
import { authService } from "./auth.service";
import { responseHTTP } from "../model/response"; 


class AuthController {
  // Signup
  async signup(req: Request, res: Response) {
    const data: IFieldsAuth = req.body;
    const response = await authService.signup(data);
    res.status(response.code).json(response.response);
  }

  // Login
  async login(req: Request, res: Response) {
    const data: IFieldsAuth = req.body;
    const response = await authService.login(data);
    res.status(response.code).json(response.response);
  }
  
  // Me
  async me(req: Request, res: Response) {
    const token = req.get("Authorization");
    if (token) {
      const response = await authService.me(token);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error authorization");
      res.status(error.code).json(error.response);
    }
  }

  // Edit Me
  async editMe(req: Request, res: Response) {
    const token = req.get("Authorization");
    const data: IEditMe = req.body;
    if (token) {
      const response = await authService.editMe(token, data);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error authorization");
      res.status(error.code).json(error.response);
    }
  }

  // Delete
  async deleteMe(req: Request, res: Response) {
    const token = req.get("Authorization");
    if (token) {
      const response = await authService.deleteMe(token);
      res.status(response.code).json(response.response);
    } else {
      const error = responseHTTP.http401("Error authorization");
      res.status(error.code).json(error.response);
    }
  }
  }


export const authController = new AuthController();
