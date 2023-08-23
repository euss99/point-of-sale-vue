<script setup>
import Link from "@/components/Link.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
</script>

<template>
  <div>
    <Link to="new-product" text="Nuevo producto" />

    <h1 class="text-4xl font-black my-10">Productos</h1>

    <p v-if="productsStore.noResults">No hay resultados</p>
    <ul
      v-else
      role="list"
      class="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      <ProductCard
        v-for="product in productsStore.productsCollection"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>
