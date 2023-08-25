import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSalesStore = defineStore("sales", () => {
  const date = ref("");

  const isDateSelected = computed(() => date.value);

  return { date, isDateSelected };
});
