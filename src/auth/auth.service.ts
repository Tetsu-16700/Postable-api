import { responseHTTP } from "../model/response";
import { IEditMe, IFieldsAuth } from "./models/auth.interfaces";
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

  // me
  async me(token: string) {
    try {
      const res_validate = await this.validateToken(token);
      if (!res_validate.response.ok) return res_validate;
      const user = res_validate.response.data;
      const { password, ...newData } = user;
      return responseHTTP.http200("ok", newData);
    } catch (error) {
      return responseHTTP.http500();
    }
  }

  // edit me
  async editMe(token: string, data: IEditMe) {
    try {
      const res_validate = await this.validateToken(token);
      if (!res_validate.response.ok) return res_validate;
      const res_edit = await userService.editUser(
        data,
        res_validate.response.data.id
      );
      return res_edit;
    } catch (error) {
      return responseHTTP.http500();
    }
  }

  // dlete
  async deleteMe(token: string) {
    try {
      const res_validate = await this.validateToken(token);
      if (!res_validate.response.ok) return res_validate;
      const res_delete = await userService.deleteUser(
        res_validate.response.data.id
      );
      return res_delete;
    } catch (error) {
      return responseHTTP.http500();
    }
  }

// validacion de token
  async validateToken(token: string) {
    try {
      const token_decrypt: any = jwt.verify(token, "super-secret");
      const res_user = await userService.findUserById(token_decrypt.id);
      return res_user;
    } catch (error) {
      return responseHTTP.http401("Token no valid");
    }
  }
}

export const authService = new AuthService();
