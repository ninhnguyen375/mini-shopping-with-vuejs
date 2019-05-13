<template>
  <div id="app">
    <NavBar></NavBar>

    <!-- Content of Route -->
    <div class="content">
      <router-view></router-view>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken';
import { mapActions } from 'vuex';
import NavBar from './components/NavBar/NavBar.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  name: 'app',
  components: {
    NavBar,
    Footer,
  },
  mounted() {
    const token = window.localStorage.getItem('auth_vue_shop_token');

    if (token) {
      const auth = jwt.verify(token, 'shhh');
      this.signIn({ email: auth.email, password: auth.password });
    } else {
      this.$store.commit('setSignInStatus', { status: 'done' });
    }
  },
  methods: {
    ...mapActions(['signIn']),
  },
};
</script>

<style lang="scss" src="./app.scss">
</style>
