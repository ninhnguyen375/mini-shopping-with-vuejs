<template>
  <div class="card m-4 shadow-lg" style="width: 15em" :key="product.id">
    <vue-load-image>
      <img class="card-img-top" slot="image" :src="product.img">
      <img class="card-img-top" slot="preloader" src="/img/loading.svg">
    </vue-load-image>
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <div class="text-danger">{{ product.price }}</div>
      <p class="card-text">
        Some quick example text to build on the card title
        and make up the bulk of the card's content.
      </p>
      <template v-if="auth.isSignIned && signInStatus.status === 'done'">
        <!-- Remove event to avoid duplicate by click -->
        <button v-if="isAdding" class="btn btn-primary">Add To Cart</button>

        <!-- Show error -->
        <button
          v-else-if="addToCartStatus.error"
          class="btn btn-danger btn-outline"
        >{{ addToCartStatus.error }}</button>

        <!-- Add to cart success -->
        <router-link
          to="/cart"
          v-else-if="addToCartStatus.isSuccess"
          class="btn btn-success"
        >In Your Cart</router-link>

        <!-- Primary -->
        <button v-else class="btn btn-primary" @click="handleAddToCart">Add To Cart</button>
      </template>

      <!-- Block add to cart if not has user logined -->
      <router-link v-else class="btn btn-secondary" to="/signin">Login To Add Your Cart</router-link>
    </div>
  </div>
</template>

<script>
import VueLoadImage from 'vue-load-image';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'productcard',
  props: {
    product: Object,
  },
  data() {
    return {
      isAdding: false,
      addToCartStatus: {
        error: '',
        isSuccess: false,
      },
    };
  },
  computed: mapGetters(['auth', 'signInStatus', 'cart']),
  methods: {
    ...mapActions(['addToCart']),
    async handleAddToCart() {
      this.isAdding = true;

      try {
        await this.addToCart({
          auth: this.auth.id,
          product: this.product,
          amount: 1,
        });
      } catch (error) {
        this.addToCartStatus.error = error.message;
      }

      this.addToCartStatus.isSuccess = true;
      this.isAdding = false;
    },
  },
  components: {
    'vue-load-image': VueLoadImage,
  },
};
</script>
