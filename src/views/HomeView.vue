<template>
  <div class="home">
    <div
      class="w-100 min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="card px-3" style="width: 500px">
        <div class="card-body">
          <h5 class="card-title text-center fw-bold mb-3">Dynamic Form</h5>

          <form @submit.prevent="handleSubmit">
            <div class="d-grid gap-3">
              <div class="form-group">
                <input
                  type="text"
                  v-model="title"
                  placeholder="Title"
                  class="form-control"
                />
                <div v-show="isSubmitted && !title" class="text-danger">
                  Please Select Form Types
                </div>
              </div>

              <section>
                <ul>
                  <li
                    class="mb-3"
                    v-for="(formType, key) in formTypes"
                    :key="key"
                  >
                    <label>
                      {{ formType["label"] }}
                      <input
                        type="checkbox"
                        name="formData"
                        :value="formType"
                        id=""
                        v-model="formData"
                      />
                    </label>
                  </li>
                </ul>
              </section>
              <div v-show="isSubmitted && !formData.length" class="text-danger">
                Please Select Form Types
              </div>
              <button class="btn btn-primary btn-block" type="submit">
                Submit
              </button>
              <span v-show="isLoading"> Loading... </span>
              <span v-show="errorMsg" class="text-danger">{{ errorMsg }}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useFormStore } from "../stores/formStore";

export default {
  data() {
    return {
      isSubmitted: false,
      formData: [],
      title: null,
      formTypes: [
        {
          type: "text",
          label: "Name",
          value: "name",
        },
        {
          type: "text",
          label: "Father Name",
          value: "father_name",
        },
        {
          type: "text",
          label: "Mother Name",
          value: "mother_name",
        },
        {
          type: "number",
          label: "Phone Number",
          value: "phone",
        },
        {
          type: "date",
          label: "Date Of Birth",
          value: "date",
        },
      ],
    };
  },
  computed: {
    ...mapState(useFormStore, ["isLoading", "errorMsg"]),
  },
  methods: {
    ...mapActions(useFormStore, ["submit"]),

    handleSubmit() {
      this.isSubmitted = true;

      if (this.formData.length > 0 && this.title) {
        this.submit({ title: this.title, data: this.formData });
      }
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
