import { responseHTTP } from "../model/response";
import { IFieldsAuth } from "./models/auth.interfaces";
import { userService } from "./user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  // signup
  async signup(data: IFieldsAuth) {
    try {
      const res_user = await userService.findUser(data.username);
      if (res_user.response.ok)
        return responseHTTP.http400("Ya existe el usuario");
      const newPassword = await bcrypt.hash(data.password, 11);
      const res_create = await userService.createUser({
        username: data.username,
        password: newPassword,
      });
      return res_create;
    } catch (error) {
      return responseHTTP.http500();
    }
  }

  // login
  async login(data: IFieldsAuth) {
    try {
      const res_user = await userService.findUser(data.username);
      if (!res_user.response.ok) return res_user;
      const res_compare = await bcrypt.compare(
        data.password,
        res_user.response.data.password
      );
      if (!res_compare) return responseHTTP.http401("No autorizado");

      const dataToken = {
        id: res_user.response.data.id,
        role: res_user.response.data.role,
      };

      const token = jwt.sign(dataToken, "secreta");

      return responseHTTP.http200(undefined, { token });
    } catch (error) {
      return responseHTTP.http500();
    }
  }
}

export const authService = new AuthService();
