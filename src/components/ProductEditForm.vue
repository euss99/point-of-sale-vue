<script setup>
import { watch, reactive } from "vue";
import { useRouter } from "vue-router";
import { doc } from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import { useProductsStore } from "@/stores/products";
import useImage from "@/composables/useImage";

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// Consultar Firestore
const db = useFirestore();
const docRef = doc(db, "products", props.id);
const product = useDocument(docRef);

const { onFileChange, url, isImageUploaded } = useImage();
const productsStore = useProductsStore();

const formData = reactive({
  name: "",
  category: "",
  price: "",
  availability: "",
  image: "",
});

watch(product, (product) => {
  if (!product) {
    router.push({ name: "products" });
  }

  Object.assign(formData, product);
});

const handleSubmit = async (data) => {
  try {
    await productsStore.updateProduct(docRef, { ...data, url });
    router.push({ name: "products" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <FormKit
    type="form"
    :value="formData"
    submit-label="Guardar Cambios"
    incomplete-message="No se pudo enviar, revisa los mensajes"
    @submit="handleSubmit"
    :actions="false"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Nombre de Producto"
      validation="required"
      v-model.trim="formData.name"
      :validation-messages="{
        required: 'El Nombre del Producto es Obligatorio',
      }"
    />

    <FormKit
      type="select"
      label="Categoría"
      name="category"
      validation="required"
      v-model.number="formData.category"
      :validation-messages="{ required: 'La Categoría es Obligatoria' }"
      :options="productsStore.categoryOptions"
    />

    <FormKit
      type="number"
      label="Precio"
      name="price"
      placeholder="Precio de Producto"
      step="1"
      min="1"
      v-model.number="formData.price"
    />

    <FormKit
      type="number"
      label="Disponibles"
      name="availability"
      placeholder="Productos Disponibles"
      v-model.number="formData.availability"
      step="1"
      min="0"
    />

    <div v-if="isImageUploaded">
      <p class="font-black">Imagen Nueva:</p>
      <img :src="url" alt="Nueva imagen Producto" class="w-52" />
    </div>

    <div v-else>
      <p class="font-black">Imagen Actual:</p>
      <img
        :src="formData.image"
        :alt="'Imagen de' + formData.image"
        class="w-52"
      />
    </div>

    <FormKit
      type="file"
      label="Cambiar Imagen"
      name="image"
      multiple="false"
      accept=".jpg"
      @change="onFileChange"
    />

    <FormKit type="submit">Guardar Cambios</FormKit>
  </FormKit>
</template>
