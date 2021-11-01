import backend from "../lib/backend";
import TokenService from "../services/TokenService";
import { User } from "../types/User";

class AuthService {
  async login(username: string, password: string) {
    try {
      const { data } = await backend.post("auth/login", {
        username,
        password
      });

      TokenService.setAccessToken(data.accessToken);
    } catch (err) {
      console.error(err);

      return false;
    }

    return true;
  }

  async getCurrentUser() {
    try {
      const { data: user } = await backend.get<User>("auth/me");

      return user;
    } catch (err) {
      console.error(err);

      return undefined;
    }
  }

  async logout() {
    try {
      await backend.get("auth/logout");
      TokenService.removeAccessToken();
    } catch (err) {
      return false;
    }

    return true;
  }

  async isLoggedIn() {
    const user = await this.getCurrentUser();

    if (!user) {
      return false;
    }

    return true;
  }
}

export default new AuthService();
