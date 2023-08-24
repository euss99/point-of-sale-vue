<script setup>
import { formatCurrency } from "../helpers";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li class="flex space-x-6 py-6">
    <img
      :src="item.image"
      :alt="item.name"
      class="h-24 w-24 flex-none rounded-md"
    />

    <div class="flex-auto space-y-1">
      <h3 class="text-gray-900">{{ item.name }}</h3>
      <p>{{ formatCurrency(item.price) }}</p>

      <select
        class="w-32 text-center p-2 rounded-lg bg-white"
        @change="cartStore.updateQuantity(item.id, +$event.target.value)"
        :value="item.quantity"
      >
        <option
          v-for="n in cartStore.checkProductAvailability(item)"
          :value="n"
        >
          {{ n }}
        </option>
      </select>
    </div>

    <div class="flex mx-auto">
      <button type="button" @click="cartStore.removeItem(item.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </li>
</template>
