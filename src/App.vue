<script setup>
  import Menu from '@/components/Menu.vue';
  import { newMenus } from '@/utils/handleMenus';

  newMenus().then((res) => {
    console.log('app.vue', res);
  });
</script>

<template>
  <Menu class="menu" />
</template>

<style scoped lang="scss">
  .menu {
    width: 200px;
  }
</style>
