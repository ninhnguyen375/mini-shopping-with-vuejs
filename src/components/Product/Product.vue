<template>
  <div v-if="allProducts[0]">
    <ProductList :products="allProducts"/>
  </div>
  <div v-else>
    <div class="container d-flex justify-content-center">
      <img src="/img/loading.svg" alt="loading">
    </div>
    <div class="mt-4 text-center text-secondary">Waiting For Server Heroku to start.</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductList from "./ProductList.vue";

export default {
  name: "product",
  async mounted() {
    this.fetchProducts();
  },
  data() {
    return {
      products: []
    };
  },
  components: { ProductList },
  methods: { ...mapActions(["fetchProducts"]) },
  computed: mapGetters(["allProducts"])
};
</script>

<style src="./product.scss" lang="scss">
</style>
