<script setup>
import { ref } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useSalesStore } from "../../stores/sales";

const salesStore = useSalesStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});
</script>

<template>
  <h1 class="text-4xl font-black mb-10">Resumen de ventas</h1>

  <div class="md:flex md:items-start gap-5">
    <div class="md:w-1/2 lg:w-1/3 flex justify-center p-5">
      <VueTailwindDatepicker
        i18n="es-mx"
        as-single
        no-input
        v-model="salesStore.date"
        :formatter="formatter"
      />
    </div>
    <div
      class="md:w-1/2 lg:w-2/3 space-y-5 lg:overflow-y-scroll p-5 pb-32"
    >
      <p class="text-center text-lg" v-if="salesStore.isDateSelected">
        Ventas de la fecha <span class="font-black">{{ salesStore.date }}</span>
      </p>
      <p v-else class="text-center text-lg">Selecciona una fecha</p>
    </div>
  </div>
</template>
