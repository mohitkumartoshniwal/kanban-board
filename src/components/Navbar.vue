<template>
  <div class="flex justify-between px-2 mb-3 text-white">
    <h1 class="font-bold text-3xl">Kanban Board</h1>
    <button
      class="font-bold"
      @click="isColumnModalActive = !isColumnModalActive"
    >
      Add Column
    </button>
  </div>
  <Modal
    :is-modal-active="isColumnModalActive"
    :heading="`${ACTIONS.ADD_COLUMN.split('_').join(' ')}`"
    @close-modal="isColumnModalActive = !isColumnModalActive"
  >
    <ColumnForm
      :action="ACTIONS.ADD_COLUMN"
      @close-modal="isColumnModalActive = !isColumnModalActive"
    />
  </Modal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ColumnForm from "./ColumnForm.vue";
import Modal from "./common/Modal.vue";
import { ACTIONS } from "@/types";

const isColumnModalActive = ref(false);
</script>
