<template>
  <div class="login">
    <div
      class="w-100 min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="card px-3" style="width: 500px">
        <div class="card-body">
          <h5 class="card-title text-center fw-bold mb-3">Member Login</h5>
          <form @submit.prevent="handleSubmit">
            <div class="d-grid gap-3">
              <div class="form-group">
                <label for="">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
                <div v-show="isSubmitted && !email" class="text-danger">
                  Email is required
                </div>
              </div>

              <div class="form-group">
                <label for="">Passowrd</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
                <div v-show="isSubmitted && !password" class="text-danger">
                  Password is required
                </div>
              </div>

              <button class="btn btn-primary btn-block" type="submit">
                Login
              </button>

              <span v-show="isLoading"> Loading... </span>
              <span v-show="errorMsg" class="text-danger">{{ errorMsg }}</span>

              <div>
                <span class="text-muted">
                  Don't have an account?
                  <RouterLink to="register">Register</RouterLink>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../stores/authStore";
import router from "../router";

export default {
  data() {
    return {
      isSubmitted: false,
      email: "",
      password: "",
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState(useAuthStore, ["isLoading", "errorMsg"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),

    handleSubmit() {
      this.isSubmitted = true;
      if (this.email && this.password) {
        this.login({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
