import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCuoponStore = defineStore("cuopon", () => {
  const cuoponInput = ref("");
  const cuoponValidationMessage = ref("");
  const discountPercentage = ref(0);
  const discount = ref(0);

  const cartStore = useCartStore();

  watch(discountPercentage, () => {
    discount.value = Number(
      (cartStore.total * discountPercentage.value).toFixed(2)
    );
  });

  const VALID_COUPONS = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  const isValidCuopon = computed(() => discountPercentage.value > 0);

  function applyCuopon() {
    if (VALID_COUPONS.some((cuopon) => cuopon.name === cuoponInput.value)) {
      cuoponValidationMessage.value = "Aplicando...";

      const percentage = VALID_COUPONS.find(
        (coupon) => coupon.name === cuoponInput.value
      ).discount;

      setTimeout(() => {
        discountPercentage.value = percentage;
        cuoponValidationMessage.value = "¡Descuento aplicado!";
      }, 2000);
    } else if (cuoponInput.value === "") {
      cuoponValidationMessage.value = "Necesitas agregar un cupón";
    } else {
      cuoponValidationMessage.value = "No existe ese cupón";
    }

    setTimeout(() => {
      cuoponValidationMessage.value = "";
    }, 4000);
  }

  function $reset() {
    cuoponInput.value = "";
    cuoponValidationMessage.value = "";
    discountPercentage.value = 0;
    discount.value = 0;
  }

  return {
    cuoponInput,
    cuoponValidationMessage,
    discount,
    isValidCuopon,
    applyCuopon,
    $reset,
  };
});
