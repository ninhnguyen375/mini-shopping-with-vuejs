<template>
  <div class="container">
    <template v-if="isPetching">
      <h4 class="text-secondary text-center">Fetching Your Cart</h4>
    </template>
    <template v-else>
      <template v-if="!cart || !cart.products[0]">
        <p class="text-secondary text-center">
          Your cart empty
          <router-link to="/" class="btn btn-primary ml-3">Go to shopping</router-link>
        </p>
      </template>
      <CartItem
        v-else
        v-for="product in cart.products"
        :handleRemoveItemCart="handleRemoveItemCart"
        :product="product"
        :key="product.id"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartItem from './CartItem.vue';

export default {
  data() {
    return {
      isPetching: true,
    };
  },
  methods: {
    ...mapActions(['fetchCart', 'removeItemCart']),
    handleRemoveItemCart(id) {
      this.removeItemCart({ cart: this.cart, productId: id });
    },
  },
  computed: mapGetters(['cart', 'auth']),
  async mounted() {
    if (this.auth.isSignIned) {
      this.isPetching = true;

      await this.fetchCart(this.auth.id);

      this.isPetching = false;
    }
  },
  name: 'cartlist',
  components: {
    CartItem,
  },
};
</script>
