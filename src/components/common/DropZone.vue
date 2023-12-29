<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { TRANSFER_DATA } from "@/types";

const emit = defineEmits<{
  (e: "dropData", payload: TRANSFER_DATA): void;
}>();

function onDrop(e: DragEvent) {
  if (e.dataTransfer) {
    let payload = JSON.parse(e.dataTransfer.getData("payload"));
    emit("dropData", payload);
  }
}
</script>
