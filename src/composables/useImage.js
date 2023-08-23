import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uid } from "uid";

export default function useImage() {
  const storage = useFirebaseStorage();
  const url = ref("");

  function onFileChange(e) {
    const file = e.target.files[0];
    const fileName = uid() + ".jpg";
    const sRef = storageRef(storage, `/products/${fileName}`); // Referencía de donde se almacenan las imágenes

    // Subit el archivo
    const uploadTask = uploadBytesResumable(sRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
      },
      () => {
        // La imagen ya se subió
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Obteniendo la URL
          url.value = downloadURL;
        });
      }
    );
  }

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null;
  });

  return { url, onFileChange, isImageUploaded };
}
