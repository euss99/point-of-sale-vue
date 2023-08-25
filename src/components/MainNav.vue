<script setup>
import Link from "./Link.vue";
import Logo from "./Logo.vue";
import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col md:flex-row gap-5 justify-between absolute top-0 w-full z-10"
  >
    <div>
      <Logo />

      <div class="flex flex-wrap gap-5 text-white mt-2">
        <h2 class="text-lg font-extrabold">Filtros:</h2>

        <div
          class="flex items-center gap-2"
          v-for="category in productsStore.categories"
          :key="category.id"
        >
          <input
            type="radio"
            name="category"
            :value="category.id"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600"
            :checked="productsStore.selectedCategory === category.id"
            @change="productsStore.selectedCategory = +$event.target.value"
          />
          <label class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav class="flex items-center">
      <Link class="h-[45px]" to="sales" text="Administrar" />
    </nav>
  </header>
</template>
