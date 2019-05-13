<template>
  <ul class="right-menu">
    <li>
      <router-link to="/signup">sign up</router-link>
    </li>
    <li>
      <router-link to="/signin">sign in</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'unsigninednav',
  props: {
    onLogin: Function,
  },
};
</script>
