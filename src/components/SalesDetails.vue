<script setup>
import { formatCurrency } from "@/helpers";
import Amount from "./Amount.vue";

defineProps({
  sale: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="border-t border-gray-200 space-y-6 py-6">
    <h2 class="text-2xl font-black">Detalles de venta:</h2>
    <p class="text-xl font-black text-gray-500">Productos vendidos</p>

    <ul
      role="list"
      class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
    >
      <li v-for="item in sale.items" class="flex space-x-6 py-6">
        <img
          :src="item.image"
          :alt="item.name"
          class="h-24 w-24 flex-none rounded-lg"
        />

        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900">{{ item.name }}</h3>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>

    <dl class="space-y-4 border-t border-gray-200 pt-4 text-sm font-medium">
      <Amount>
        <template #label>Subtotal:</template>
        <template #amount>{{ formatCurrency(sale.subtotal) }}</template>
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        <template #amount>{{ formatCurrency(sale.taxes) }}</template>
      </Amount>
      <Amount v-if="sale.discount" class="bg-green-200 p-2">
        <template #label>Descuento:</template>
        <template #amount>{{ formatCurrency(sale.discount) }}</template>
      </Amount>
      <Amount>
        <template #label>Total pagado:</template>
        <template #amount>{{ formatCurrency(sale.total) }}</template>
      </Amount>
    </dl>
  </div>
</template>
