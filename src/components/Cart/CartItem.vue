<template>
  <div class="card mt-3">
    <div class="card-body row">
      <div class="col-2">
        <vue-load-image>
          <img slot="preloader" width="90" src="/img/loading.svg" alt="loading">
          <img slot="image" width="100" :src="product.img" alt="img">
        </vue-load-image>
      </div>
      <div class="col-6">
        <div>{{ product.name }}</div>
        <div>{{ product.price }}</div>
      </div>
      <div class="col-2">
        <input :value="product.amount" type="number" name="quantity" class="form-control">
      </div>
      <div class="col-2 text-right">
        <button class="btn btn-danger" @click="handleRemoveItemCart(product.id)">
          <font-awesome-icon icon="trash-alt"></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoadImage from 'vue-load-image';

export default {
  name: 'cartitem',
  props: ['product', 'handleRemoveItemCart'],
  components: {
    'vue-load-image': VueLoadImage,
  },
};
</script>
