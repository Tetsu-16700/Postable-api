import { authQuery } from "./auth.query";
import { responseHTTP } from "../model/response";
import { IEditMe, IFieldsAuth } from "./models/auth.interfaces";

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

  async findUserById(id: string) {
    try {
      const user = await authQuery.findUserById(id);
      if (!user) return responseHTTP.http400("user not found");
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

  async editUser(data: IEditMe, id: string) {
    try {
      const res_user = await this.findUserById(id);
      if (!res_user.response.ok) return res_user;
      const res_edit = await authQuery.editUser(data, id);
      const { password, ...newData } = res_edit;
      return responseHTTP.http200("Edit correct", newData);
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }

  async deleteUser(id: string) {
    try {
      const res_user = await this.findUserById(id);
      if (!res_user.response.ok) return res_user;
      await authQuery.deleteUser(id);
      return responseHTTP.http200("delete correct");
    } catch (error) {
      return responseHTTP.http500(undefined, error);
    }
  }
}

export const userService = new UserService();
