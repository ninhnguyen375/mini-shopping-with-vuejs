<template>
  <nav class="navbar">
    <ul class="left-menu">
      <li>
        <router-link to="/">Brand</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
    </ul>

    <SignInedNav v-if="auth.isSignIned" :name="auth.name" :onLogout="handleLogout"/>
    <UnSignInedNav v-else :onLogin="handleLogin"/>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import SignInedNav from './SignInedNav.vue';
import UnSignInedNav from './UnSignInedNav.vue';

export default {
  name: 'navbar',

  computed: mapGetters(['auth']),

  components: {
    SignInedNav,
    UnSignInedNav,
  },

  methods: {
    handleLogout() {
      this.isLogined = !this.isLogined;
    },
    handleLogin() {
      this.isLogined = !this.isLogined;
    },
  },
};
</script>

<style lang="scss" src="./navbar.scss">
</style>
