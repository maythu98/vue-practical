import { defineStore } from "pinia";
import router from "../router";

export const usePublicFormStore = defineStore("public-form", {
  state: () => {
    return {
      isLoading: false,
      errorMsg: null,
      formLoading: false,
      formError: null,
      successMsg: null,
      publicForm: null,
    };
  },
  actions: {
    async get() {
      this.formLoading = true;
      this.formError = null;
      await fetch(`http://127.0.0.1:8000/api/v1/public-form`)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
          }
          return response.json();
        })
        .then((data) => {
          //Redirect Public Form
          this.publicForm = data;
        })
        .catch((error) => {
          this.formError = error.message;
        })
        .finally(() => {
          this.formLoading = false;
        });
    },
    async submit(data) {
      this.isLoading = true;
      this.errorMsg = null;
      this.successMsg = null;

      //submit
      const token = JSON.parse(localStorage.getItem("token"));
      let jsonBody = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      };
      await fetch(`http://127.0.0.1:8000/api/v1/public-form`, jsonBody)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
          }
          return response.json();
        })
        .then((data) => {
          //Redirect Public Form
          router.push({ path: "/public-form" });
          this.successMsg = "Successfully Submitted.";
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
