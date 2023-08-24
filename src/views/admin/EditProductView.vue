<script setup>
import { useRoute } from "vue-router";
import Link from "@/components/Link.vue";
import ProductEditForm from "@/components/ProductEditForm.vue";

const route = useRoute();
</script>

<template>
  <div class="mt-10">
    <Link to="products" text="Volver" />
    <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mx-auto mt-10 p-10 w-full xl:w-2/4">
        <ProductEditForm :id="route.params.id" />
      </div>
    </div>
  </div>
</template>
