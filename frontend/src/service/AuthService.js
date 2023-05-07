import axios from "axios";

const API_URL = "https://localhost:7298/api/Authentication/login";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL, {
        "email": username,
        "password":password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL, {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();