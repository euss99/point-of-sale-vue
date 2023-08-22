<script setup>
import { RouterLink } from "vue-router";

defineProps({
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    :to="{ name: to }"
    class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
  >
    {{ text }}
  </RouterLink>
</template>
