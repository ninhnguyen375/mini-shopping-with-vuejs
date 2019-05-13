<template>
  <ProductList :products="allProducts"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductList from './ProductList.vue';

export default {
  name: 'product',
  async mounted() {
    this.fetchProducts();
  },
  data() {
    return {
      products: [],
    };
  },
  components: { ProductList },
  methods: { ...mapActions(['fetchProducts']) },
  computed: mapGetters(['allProducts']),
};
</script>

<style src="./product.scss" lang="scss">
</style>
