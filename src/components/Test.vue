<script setup>
  import { ref } from 'vue';
  import { test } from '@/api/user';

  test().then((res) => console.log(res));

  const count = ref(0);
</script>

<template>
  <div class="card">
    <el-button type="primary" @click="count++">count is {{ count }}</el-button>
  </div>
</template>

<style scoped lang="scss">
  .div {
    background-color: $bg-color;
  }
</style>
