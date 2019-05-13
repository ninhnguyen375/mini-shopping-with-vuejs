<template>
  <div class="container pt-5">
    <h1 class="text-secondary text-center">Sign In</h1>
    <!-- Form sign in -->
    <form @submit="handleSignIn" class="col-lg-4 col-md-6 m-auto">
      <!-- Error message -->
      <div
        class="alert alert-danger"
        v-if="signInStatus.errorMessage"
      >{{ signInStatus.errorMessage }}</div>

      <label for="email">
        Your Name
        <span class="text-danger">*</span>
      </label>
      <input
        v-validate="'required|email'"
        id="email"
        name="email"
        placeholder="email"
        class="form-control"
        type="text"
        v-model="email"
      >
      <div class="text-danger">{{ errors.first('email') }}</div>

      <label for="password">
        Password
        <span class="text-danger">*</span>
      </label>
      <input
        name="password"
        v-validate="'required|min:6'"
        id="password"
        placeholder="Password"
        class="form-control"
        type="password"
        v-model="password"
      >
      <div class="text-danger">{{ errors.first('password') }}</div>

      <button type="submit" class="btn btn-primary mt-4">Sign In</button>
      <p class="text-secondary mt-4">
        Not have account?
        <router-link to="/signup">Sign Up.</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: '',
      signInError: '',
    };
  },
  computed: mapGetters(['signInStatus']),
  methods: {
    async handleSignIn(e) {
      e.preventDefault();
      await this.$validator.validateAll().then(async (res) => {
        if (res) {
          await this.signIn({ email: this.email, password: this.password });

          if (this.signInStatus.error) {
            this.signInError = 'Name or Password incorrect';
          } else {
            this.$router.push('/');
          }
        }
      });
    },
    ...mapActions(['signIn']),
  },
};
</script>
