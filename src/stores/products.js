import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import {
  collection,
  query,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const selectedCategory = ref(1);
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
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);

      await Promise.all([
        deleteObject(imageRef),
        updateDoc(docRef, {
          ...values,
          image: url.value,
        }),
      ]);
    } else {
      await updateDoc(docRef, values);
    }
  }

  // Eliminar un producto
  async function deleteProduct(id) {
    if (confirm("¿Deseas eliminar el producto?")) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);

      await Promise.all([deleteObject(imageRef), deleteDoc(docRef)]);
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

  const filteredProducts = computed(() => {
    return productsCollection.value.filter(
      (product) => product.category === selectedCategory.value
    );
  });

  return {
    productsCollection,
    createProduct,
    updateProduct,
    deleteProduct,
    categoryOptions,
    noResults,
    filteredProducts,
    categories,
    selectedCategory,
  };
});
