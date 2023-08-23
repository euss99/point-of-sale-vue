<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useImage from "@/composables/useImage";
import { useProductsStore } from "@/stores/products";

const { url, onFileChange, isImageUploaded } = useImage();
const productsStore = useProductsStore();

const router = useRouter();

const formData = reactive({
  name: "",
  category: "",
  price: "",
  availability: "",
  image: "",
});

const handleSubmit = async (data) => {
  const { image, ...values } = data;
  try {
    await productsStore.createProduct({
      ...values,
      image: url.value,
    });

    router.push({ name: "products" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <FormKit
    type="form"
    submit-label="Agregar producto"
    incomplete-message="No se pudo enviar, revisa que todos los campos esten llenos."
    @submit="handleSubmit"
    :value="formData"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Nombre de producto"
      validation="required"
      :validation-messages="{
        required: 'El nombre del producto es obligatorio.',
      }"
      v-model.trim="formData.name"
    />

    <FormKit
      type="file"
      label="Imagen producto"
      name="image"
      validation="required"
      :validation-messages="{
        required: 'La imagen del producto es obligatoria.',
      }"
      accept=".jpg"
      @change="onFileChange"
      v-model.trim="formData.image"
    />

    <div v-if="isImageUploaded">
      <p class="font-black">Imagen producto:</p>
      <img :src="url" alt="Image preview" class="w-32" />
    </div>

    <FormKit
      type="select"
      label="Categoría"
      name="category"
      validation="required"
      :validation-messages="{
        required: 'La categoría es obligatoria.',
      }"
      :options="productsStore.categoryOptions"
      v-model.number="formData.category"
    />

    <FormKit
      type="number"
      label="Precio"
      name="price"
      placeholder="Precio del producto"
      validation="required"
      :validation-messages="{
        required: 'El precio es obligatorio.',
      }"
      min="1"
      v-model.number="formData.price"
    />

    <FormKit
      type="number"
      label="Disponibles"
      name="availability"
      placeholder="Cantidad disponible"
      validation="required"
      :validation-messages="{
        required: 'La cantidad es obligatoria.',
      }"
      min="1"
      v-model.number="formData.availability"
    />
  </FormKit>
</template>
