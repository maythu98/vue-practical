<template>
  <div class="public-form">
    <div
      class="w-100 min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="card px-3" style="width: 500px">
        <div class="card-body">
          <h5 class="card-title text-center fw-bold mb-3">
            Public Survey Form
          </h5>

          <form @submit.prevent="handleSubmit">
            <div class="d-grid gap-3" v-if="publicForm">
              <h6>{{ publicForm.title }}</h6>

              <section>
                <div
                  class="form-group mb-3"
                  v-for="item in JSON.parse(publicForm.data)"
                  :key="item['value']"
                >
                  <label for="">{{ item.label }}</label>
                  <input
                    :type="item.type"
                    class="form-control"
                    :name="item.value"
                  />
                </div>
              </section>
              <button class="btn btn-primary btn-block" type="submit">
                Submit
              </button>
              <span v-show="isLoading"> Loading... </span>
              <span v-show="errorMsg" class="text-danger">{{ errorMsg }}</span>
              <span v-show="successMsg" class="text-success">{{
                successMsg
              }}</span>
            </div>
          </form>

          <div class="my-3">
            <span class="text-muted">
              Create New Survey?
              <RouterLink to="/">Create Form</RouterLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";

import { mapActions, mapState } from "pinia";
import { usePublicFormStore } from "../stores/publicStore";

export default {
  components: { RouterLink },
  data() {
    return {
      isSubmitted: false,
      // formData: [],
      title: null,
      publicForm: [],
    };
  },
  created() {
    this.publicForm = JSON.parse(localStorage.getItem("publicForm"));
    console.log(this.publicForm, this.publicForm.title);
  },
  watch: {
    successMsg(newSuccessMsg, oldSuccessMsg) {
      if (newSuccessMsg) {
        document.forms[0].reset();
      }
    },
  },
  computed: {
    ...mapState(usePublicFormStore, ["isLoading", "errorMsg", "successMsg"]),
  },
  methods: {
    ...mapActions(usePublicFormStore, ["submit"]),

    handleSubmit(e) {
      this.isSubmitted = true;
      const data = Object.fromEntries(new FormData(e.target).entries());
      //check
      this.submit({ form_id: this.publicForm.id, data: data });
    },
  },
};
</script>
<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0 !important;
}

li {
  border: 1px solid black;
  padding: 1rem;
}

li label {
  display: flex;
  justify-content: space-between;
}
</style>
