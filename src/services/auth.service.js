import axios from "axios";

//const AUTH_URL = "https://test.chatnet.ai/v1/auth/";
const AUTH_URL = `${process.env.REACT_APP_API_ROOT}/v1/auth/`;

export const authHeader = () => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { "x-access-token": user.accessToken }; // for Node.js Express back-end
  } else {
    // return { Authorization: '' }; // for Spring Boot back-end
    return { "x-access-token": null }; // for Node Express back-end
  }
};

export const login = (email, password) => {
  return axios
    .post(AUTH_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.tokens.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.removeItem("conversation");
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (name, email, password) => {
  return axios.post(AUTH_URL + "register", {
    name,
    email,
    password,
  });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

export const remove = (id) => {
  return axios
    .delete(AUTH_URL + `delete/${id}`, {
      id,
    })
    .then((response) => {
      //console.log(response);
    });
};
