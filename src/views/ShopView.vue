<script setup>
import MainNav from "@/components/MainNav.vue";
import ProductShopCard from "@/components/ProductShopCard.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();
const { filteredProducts, noResults } = storeToRefs(productsStore);
</script>

<template>
  <MainNav />

  <main class="pt-24 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div
      class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll pt-36 md:pt-12 py-24 px-10"
    >
      <p v-if="noResults" class="text-center text-4xl">No hay resultados</p>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
        <ProductShopCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <ShoppingCart />
    </aside>
  </main>
</template>
