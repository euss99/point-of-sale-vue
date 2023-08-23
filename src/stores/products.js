import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
} from "firebase/firestore";

export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const categories = [
    { id: 1, name: "Sudadera" },
    { id: 2, name: "Tenis" },
    { id: 3, name: "Lentes" },
  ];

  const productRef = collection(db, "products"); // Referencia a la collecion de datos

  // Obteniendo los productos
  const q = query(productRef);
  const productsCollection = useCollection(q);

  // Creando un producto
  async function createProduct(product) {
    await addDoc(productRef, product);
  }

  // Editar un producto
  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;

    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      });
    } else {
      await updateDoc(docRef, values);
    }
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

  const noResults = computed(() => productsCollection.value.length === 0);

  return {
    productsCollection,
    createProduct,
    updateProduct,
    categoryOptions,
    noResults,
  };
});
