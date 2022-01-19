<template>
  <div class="login-wrapper">
    <div class="row q-mb-md">
      <q-banner class="bg-blue-1 col" style="border-radius:8px">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Login
      </q-banner>
    </div>
    <form class="form-box" @submit.prevent="submitForm">
      <div class="row q-mb-md">
        <q-input
          v-model="formData.email"
          :dense="true"
          ref="email"
          lazy-rules
          filled
          label="ელ-ფოსტა"
          class="size-w--full"
        />
      </div>
      <div class="row q-mb-md">
        <q-input
          v-model="formData.passwordHash"
          :rules="[(val) => val.length >= 6 || 'Please enter at least 6 characters.']"
          :dense="true"
          ref="passwordHash"
          lazy-rules
          type="password"
          filled
          label="პაროლი"
          class="size-w--full"
        />
      </div>
      <div class="row">
        <q-space />
        <q-btn color="primary" label="login" type="submit" to="/" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from "vue";

export default {
  data() {
    return {
      formData: {
        email: "",
        passwordHash: "",
      },
    };
  },
  methods: {
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.passwordHash.validate();
      this.$refs.passwordHash.validate();
      if (!this.$refs.email.hasError && !this.$refs.passwordHash.hasError) {
        // if (this.tab == "login") {
        //   this.loginUser(this.formData);
        // } else {
        //   this.registerUser(this.formData);
        // }
      }
    },
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
