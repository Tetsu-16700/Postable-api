import { authQuery } from "./auth.query";
import { responseHTTP } from "../model/response";
import { IFieldsAuth } from "./models/auth.interfaces";

class UserService {
  // parametro
  async findUser(username: string) {
    try {
      const user = await authQuery.findUser(username);
      if (!user) return responseHTTP.http400("No se encontro el usuario");
      return responseHTTP.http200(undefined, user);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }

  async createUser(data: IFieldsAuth) {
    try {
      const response = await authQuery.createUser(data);
      const { password, ...newData } = response;
      return responseHTTP.http200("Creado", newData);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }
}

export const userService = new UserService();
