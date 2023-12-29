<script setup lang="ts">
import Column from "./components/Column.vue";
import Navbar from "./components/Navbar.vue";
import { STORE } from "./stores/kanbanStore";
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <Navbar />
    <div class="flex-1 flex gap-4 px-3 overflow-x-auto">
      <Column v-for="column of STORE" :key="column.columnId" :column="column" />
    </div>
  </div>
</template>

<style>
#app {
  @apply select-none h-screen bg-gray-500;
}
</style>
