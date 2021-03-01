import { get } from "./helpers/api";

const authProvider = {
  // called when the user attempts to log in
  login: async ({ username }) => {
    const token = await get("demologin");
    localStorage.setItem("apiToken", token);
    // accept all username/password combinations
  },
  // called when the user clicks on the logout button
  logout: async () => {
    localStorage.removeItem("apiToken");
  },
  // called when the API returns an error
  checkError: async ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("apiToken");
      return Promise.reject();
    }
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("apiToken")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: async () => {},
};

export default authProvider;
