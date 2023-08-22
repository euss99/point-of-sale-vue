<script setup>
import Link from "./Link.vue";
import Logo from "./Logo.vue";
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10"
  >
    <div>
      <Logo />
    </div>
    <nav class="flex">
      <Link to="admin" text="Administrar" />
    </nav>
  </header>
</template>
