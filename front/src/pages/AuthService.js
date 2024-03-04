/*class AuthService {
    constructor() {
      if (!AuthService.instance) {
        this.isLoggedIn = false;
        AuthService.instance = this;
      }
  
      return AuthService.instance;
    }
  
    login(username, password) {
      if (username === "admin" && password === "password") {
        this.isLoggedIn = true;
        localStorage.setItem("username", username);
      } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    }
  
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem("username");
    }
  
    getIsLoggedIn() {
      return this.isLoggedIn;
    }
  }
  
  export default AuthService;
  */


class AuthService {
    static instance;

    constructor() {
        if (!AuthService.instance) {
            this.isLoggedIn = false;
            AuthService.instance = this;
        }

        return AuthService.instance;
    }

    login() {
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");
    }

    getIsLoggedIn() {
        return this.isLoggedIn;
    }
}

export default AuthService;
