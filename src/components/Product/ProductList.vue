<template>
  <div>
    <transition-group
      class="container d-flex justify-content-center flex-wrap d-block"
      enter-active-class="animated fadeIn"
      leave-active-class
    >
      <ProductCard
        :style="{ animationDelay: `${i*0.2}s`}"
        v-for="(product, i) in products"
        :key="product.id"
        :product="product"
      />
    </transition-group>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'productlist',
  props: {
    products: Array,
  },
  components: {
    ProductCard,
  },
};
</script>
