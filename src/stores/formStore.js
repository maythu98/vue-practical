import { defineStore } from "pinia";
import router from "../router";

export const useFormStore = defineStore("form", {
  state: () => {
    return {
      isLoading: false,
      errorMsg: null,
    };
  },
  actions: {
    async submit(data) {
      this.isLoading = true;
      this.errorMsg = null;

      //Login
      const token = JSON.parse(localStorage.getItem("token"));
      let jsonBody = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      };
      await fetch(`http://127.0.0.1:8000/api/v1/dynamic-form`, jsonBody)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
          }
          return response.json();
        })
        .then((data) => {
          //Redirect Public Form
          console.log(data);
          localStorage.setItem("publicForm", JSON.stringify(data));
          router.push({ path: "/public-form" });
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
