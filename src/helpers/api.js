import {useApi, Token, Request} from "@apparts/api";

const APIVERSION = 1;
const URL = "http://localhost:3000/v/";

const logout = () => {
  // Log out user on 401 HTTP-Error
};

class MyToken extends Token {
  constructor(user) {
    super(user);

    // Tell Token where to find the users api token, should you
    // already have one
    const token = localStorage.getItem("apiToken");
    this._apiToken = token;
  }

  async renewAPIToken(user) {
    // Tell Token how to renew the API Token
    const apiToken = await get("demologin");
    return apiToken;
  }

  static getUserKey(user) {
    // Tell Token how to identify users
    return "demo";
  }
}

class MyRequest extends Request {
  getURL(apiVersion) {
    // Tell Request what the URL prefix is
    return URL + apiVersion;
  }
  getAPIVersion() {
    // Tell Request what the default APIVersion is
    return APIVERSION;
  }

  online() {
    // Will be called, when a network-call succeded
  }

  authUser(user) {
    // Define a method for authenticating with a user token.
    // This will be called by you, when you want to authenticate with a user
    this._auth = MyToken.getAPIToken(user);
    return this;
  }

  async middleware() {
    // Tell Request what to do on recieving not-yet caught errors, that should be
    // handled globally.

    this.on(410, () => alert("Your website is out of date, please reload it."));
    this.on({ status: 401, error: "Token invalid" }, () => { throw "Invalid token"; });
    this.on(401, logout);
    this.on(0, () => alert("We could not reach the server. Are you online?"));
  }
}


const { get, put, patch, post, del } = useApi(MyRequest);/* eslint-disable-line */
export { get, put, patch, post, del };
