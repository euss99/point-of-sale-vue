<script setup>
import Link from "@/components/Link.vue";
import ProductAddForm from "@/components/ProductAddForm.vue";
</script>

<template>
  <div>
    <Link to="products" text="Volver" />

    <h1 class="text-4xl font-black my-10">Nuevo producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full xl:w-2/4">
        <ProductAddForm />
      </div>
    </div>
  </div>
</template>
