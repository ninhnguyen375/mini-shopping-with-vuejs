<template>
  <ul class="right-menu">
    <li>
      <router-link to="/">{{ name }}</router-link>
    </li>
    <li>
      <a href="#" @click="handleSignOut">sign out</a>
    </li>
    <li>
      <router-link to="/cart">
        <font-awesome-icon icon="shopping-cart"/>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'signinednav',
  methods: {
    handleSignOut() {
      this.signOut();
    },
    ...mapActions(['signOut']),
  },
  props: {
    name: String,
    onLogout: Function,
  },
};
</script>
