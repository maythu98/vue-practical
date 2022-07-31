<template>
  <div class="register">
    <div
      class="w-100 min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="card px-3" style="width: 500px">
        <div class="card-body">
          <h5 class="card-title text-center fw-bold mb-3">Member Register</h5>
          <form @submit.prevent="handleSubmit">
            <div class="d-grid gap-3">
              <div class="form-group">
                <label for="">User Name</label>
                <input
                  type="name"
                  class="form-control form-control-md"
                  placeholder="Name"
                  v-model="name"
                />
              </div>

              <div class="form-group">
                <label for="">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <div class="form-group">
                <label for="">Passowrd</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
              </div>

              <div class="form-group">
                <label for="">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirmation Password"
                  v-model="password_confirmation"
                />
              </div>

              <button class="btn btn-primary btn-block" type="submit">
                Register
              </button>
              <span v-show="isLoading"> Loading... </span>
              <span v-show="errorMsg" class="text-danger">{{ errorMsg }}</span>

              <div>
                <span class="text-muted">
                  Already Account?
                  <RouterLink to="login">Login</RouterLink>
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
    ...mapActions(useAuthStore, ["register"]),

    handleSubmit() {
      this.isSubmitted = true;
      if (this.email && this.password) {
        this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
      }
    },
  },
};
</script>
