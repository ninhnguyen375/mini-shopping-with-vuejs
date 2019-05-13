<template>
  <div class="container mt-5">
    <template
      v-if="!auth.isSignIned && signInStatus.status === 'done'"
    >{{ $router.push('/signin') }}</template>

    <!-- load content when user signed in -->
    <div v-if="auth.isSignIned">
      <h1 class="text-center">Your cart</h1>
      <CartList></CartList>
    </div>

    <!-- waiting for sign in event -->
    <template v-if="signInStatus.status === 'pending'">
      <h4 class="text-center text-secondary">Initialing...</h4>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartList from '../components/Cart/CartList.vue';

export default {
  name: 'cart',
  computed: mapGetters(['auth', 'signInStatus']),
  mounted() {
    if (!this.auth.isSignIned && this.signInStatus.status === 'done') {
      this.$router.push('/signin');
    }
  },
  components: {
    CartList,
  },
};
</script>
