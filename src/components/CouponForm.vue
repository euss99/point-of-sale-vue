<script setup>
import { useCuoponStore } from "../stores/cuopon";

const cuoponStore = useCuoponStore();
</script>

<template>
  <p class="mt-5 py-3 font-bold border-t border-gray-200">¿Tienes un cupón?</p>

  <div class="flex">
    <input
      type="text"
      placeholder="Ingresa un cupón"
      class="p-2 bg-white border-gray-300 w-full rounded-tl rounded-bl"
      v-model="cuoponStore.cuoponInput"
    />
    <button
      type="button"
      class="p-3 bg-green-400 font-bold rounded-tr rounded-br disabled:opacity-30"
      @click="cuoponStore.applyCuopon()"
      :disabled="cuoponStore.isValidCuopon"
    >
      Canjear
    </button>
  </div>

  <p class="py-2 text-center text-sm font-extrabold">
    {{ cuoponStore.cuoponValidationMessage }}
  </p>
</template>
