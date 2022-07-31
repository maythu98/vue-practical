import { defineStore } from "pinia";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: null,
      user: null,
      isLoading: false,
      errorMsg: null,
    };
  },
  actions: {
    async login(data) {
      this.isLoading = true;
      this.errorMsg = null;

      //Login
      let jsonBody = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      await fetch(`http://127.0.0.1:8000/api/v1/login`, jsonBody)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
          }
          return response.json();
        })
        .then((data) => {
          let user = data.user;
          // login successful if there's a jwt token in the response
          if (data.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(data.access_token));
            router.push({ path: "/" });

            console.log("success");
          }
        })
        .catch((error) => {
          this.errorMsg = error.message;
          console.log("error Mesage");
        })
        .finally(() => {
          this.isLoading = false;
        });

      // .then(
      //   (response) => {
      //     console.log(
      //       response,
      //       response.text().then((data) => data.message)
      //     );

      //     let user = response.data();
      //     // login successful if there's a jwt token in the response
      //     if (user.access_token) {
      //       // store user details and jwt token in local storage to keep user logged in between page refreshes
      //       localStorage.setItem("user", JSON.stringify(user));
      //     }
      //     return user;
      //   }
      // );
    },

    async register(data) {
      this.isLoading = true;
      this.errorMsg = null;

      //Login
      let jsonBody = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      await fetch(`http://127.0.0.1:8000/api/v1/register`, jsonBody)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
          }
          return response.json();
        })
        .then((data) => {
          let user = data.user;
          // login successful if there's a jwt token in the response
          if (data.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(data.access_token));
            router.push({ path: "/" });

            console.log("success");
          }
        })
        .catch((error) => {
          this.errorMsg = error.message;
          console.log("error Mesage");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
