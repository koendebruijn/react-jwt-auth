class TokenService {
  private itemName = "accessToken";

  getLocalAccessToken() {
    return localStorage.getItem(this.itemName);
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.itemName, token);
  }

  removeAccessToken() {
    localStorage.removeItem(this.itemName);
  }
}

export default new TokenService();
