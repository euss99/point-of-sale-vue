<script setup>
import Link from "@/components/Link.vue";
import useImage from "@/composables/useImage";

const { url, onFileChange, isImageUploaded } = useImage();
</script>

<template>
  <div>
    <Link to="products" text="Volver" />

    <h1 class="text-4xl font-black my-10">Nuevo producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Agregar producto"
          incomplete-message="No se pudo enviar, revisa que todos los campos esten llenos."
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
            :options="[1, 2, 3]"
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
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
