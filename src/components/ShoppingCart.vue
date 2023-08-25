<script setup>
import ShoppingCartItem from "./ShoppingCartItem.vue";
import CouponForm from "./CouponForm.vue";
import Amount from "./Amount.vue";
import { useCartStore } from "@/stores/cart";
import { useCuoponStore } from "../stores/cuopon";
import { formatCurrency } from "@/helpers";

const cartStore = useCartStore();
const cuoponStore = useCuoponStore();
</script>

<template>
  <div>
    <p v-if="cartStore.isCartEmpty" class="text-xl text-center text-gray-900">
      El carrito está vacio
    </p>
    <div v-else>
      <p class="text-4xl font-bold text-gray-900">Resumen de venta</p>
      <ul role="list" class="mt-6 divide-y divide-gray-300">
        <ShoppingCartItem
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
        />
      </ul>

      <dl class="space-y-4 border-t border-gray-200 pt-4 text-sm font-medium">
        <Amount>
          <template #label>Subtotal:</template>
          <template #amount>{{ formatCurrency(cartStore.subtotal) }}</template>
        </Amount>
        <Amount>
          <template #label>Impuestos:</template>
          <template #amount>{{ formatCurrency(cartStore.taxes) }}</template>
        </Amount>
        <Amount v-if="cuoponStore.isValidCuopon">
          <template #label>Descuento:</template>
          <template #amount>{{
            formatCurrency(cuoponStore.discount)
          }}</template>
        </Amount>
        <Amount>
          <template #label>Total a pagar:</template>
          <template #amount>{{ formatCurrency(cartStore.total) }}</template>
        </Amount>
      </dl>

      <CouponForm />

      <button
        type="button"
        class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 rounded"
        @click="cartStore.checkout"
      >
        Confirmar compra
      </button>
    </div>
  </div>
</template>
