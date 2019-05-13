<template>
  <div class="container pt-5">
    <h1 class="text-secondary text-center">Sign Up</h1>
    <!-- Form sign in -->
    <form class="col-lg-4 col-md-6 m-auto" @submit="handleSignUp" autocomplete="off">
      <!-- Error message -->
      <div class="alert alert-danger" v-show="signUpError">{{ signUpError }}</div>

      <label for="email">
        Your Email
        <span class="text-danger">*</span>
      </label>
      <input
        id="email"
        v-validate="'required|email|duplicateEmail'"
        placeholder="Email"
        class="form-control"
        type="email"
        v-model="email"
        name="email"
      >
      <div class="text-danger">{{ errors.first('email') }}</div>

      <label for="name">
        Your Name
        <span class="text-danger">*</span>
      </label>
      <input
        id="name"
        v-validate="'required|min:3'"
        placeholder="Name"
        class="form-control"
        type="text"
        v-model="name"
        name="name"
      >
      <div class="text-danger">{{ errors.first('name') }}</div>

      <label for="password">
        Password
        <span class="text-danger">*</span>
      </label>
      <input
        id="password"
        v-validate="'required|min:6|confirmed:passwordConfirm'"
        placeholder="Password"
        class="form-control"
        type="password"
        v-model="password"
        name="password"
      >
      <div class="text-danger">{{ errors.first('password') }}</div>

      <label for="passwordConfirm">
        Confirm Password
        <span class="text-danger">*</span>
      </label>
      <input
        id="passwordConfirm"
        ref="passwordConfirm"
        placeholder="Confirm Password"
        class="form-control"
        type="password"
        v-model="passwordConfirm"
      >

      <button type="submit" class="btn btn-primary mt-4">Sign Up</button>
      <p class="text-secondary mt-4">
        Allready have account?
        <router-link to="/signin">Sign In.</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'signup',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      signUpError: '',
      wrongPasswordConfirm: false,
    };
  },
  methods: {
    async handleSignUp(e) {
      e.preventDefault();
      const isValidated = await this.$validator.validateAll();
      if (!isValidated) return;

      try {
        await axios.post('/users', {
          email: this.email,
          name: this.name,
          password: this.password,
          permission: 1,
        });
        this.$router.push('/signin');
      } catch (err) {
        this.signUpError = err.message;
      }
    },
  },
};
</script>
