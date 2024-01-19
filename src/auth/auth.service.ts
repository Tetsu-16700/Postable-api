import { responseHTTP } from "../model/response";
import { IFieldsAuth } from "./models/auth.interfaces";
import { userService } from "./user.service";
import bcrypt from "bcrypt";

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
}

export const authService = new AuthService();
