<template>
  <div
    draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import type { TRANSFER_DATA } from "@/types";

const props = defineProps({
  transferData: {
    type: Object as PropType<TRANSFER_DATA>,
    required: true,
  },
});

function onDrag(e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";

    e.dataTransfer.setData("payload", JSON.stringify(props.transferData));
  }
}
</script>
