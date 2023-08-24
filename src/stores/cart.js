import { ref, computed, watchEffect } from "vue";
import { useCuoponStore } from "./cuopon";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);
  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.1;

  const cuoponStore = useCuoponStore();

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    taxes.value = subtotal.value * TAX_RATE;
    total.value = (subtotal.value + taxes.value) - cuoponStore.discount;
  });

  const isCartEmpty = computed(() => {
    return items.value.length === 0;
  });

  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });

  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      // El item ya esta en el carrito
      if (isProductAvailable(item, index)) {
        // console.log("Estas quieriendo agregar más items que los disponibles");
        return;
      }
      items.value[index].quantity++;
    } else {
      // El item no esta en el carrito
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);
  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };

  return {
    items,
    subtotal,
    taxes,
    total,
    isCartEmpty,
    checkProductAvailability,
    addItem,
    removeItem,
    updateQuantity,
  };
});
