import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { ref, computed, watchEffect } from "vue";
import { getCurrentDate } from "../helpers";
import { useCuoponStore } from "./cuopon";
import { useFirestore } from "vuefire";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);
  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.1;

  const cuoponStore = useCuoponStore();
  const db = useFirestore();

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2));
    total.value = Number(
      (subtotal.value + taxes.value - cuoponStore.discount).toFixed(2)
    );
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

  async function checkout() {
    try {
      await addDoc(collection(db, "sales"), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: cuoponStore.discount,
        total: total.value,
        date: getCurrentDate(),
      });

      // Sustraer la cantidad de lo disponible
      items.value.forEach(async (item) => {
        const productRef = doc(db, "products", item.id); // Identificar la referencia del producto
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef); // Obtenemos el producto
          const availability =
            currentProduct.data().availability - item.quantity; // Restamos lo disponible con la cantidad comprada

          transaction.update(productRef, { availability: availability }); // Actualizamos lo disponible
        });
      });

      // Reiniciar el state
      $reset();
      cuoponStore.$reset();
    } catch (error) {
      console.log(error);
    }
  }

  function $reset() {
    items.value = [];
    subtotal.value = 0;
    taxes.value = 0;
    total.value = 0;
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
    checkout,
  };
});
