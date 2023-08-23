import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";

export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const categories = [
    { id: 1, name: "Sudadera" },
    { id: 2, name: "Tenis" },
    { id: 3, name: "Lentes" },
  ];

  async function createProduct(product) {
    // const productRef = ;
    await addDoc(collection(db, "products"), product);
  }

  // Estructura aceptada en las opciones de FormKit:
  const categoryOptions = computed(() => {
    const options = [
      { label: "Seleccione", value: "", attrs: { disabled: true } },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];

    return options;
  });

  return { createProduct, categoryOptions };
});
