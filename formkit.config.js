import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: "block mb-1 font-bold text-lg",
        message: "text-red-500 mb-5",
        wrapper: "mb-3 space-y-2",
        input:
          "w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400",
      },
      text: {},
      file: {
        noFiles: "block my-2",
        fileItem: "hidden",
        input: "$reset w-full",
      },
      submit: {
        input:
          "$reset w-full bg-green-400 hover:bg-green-500 p-2 font-bold uppercase disabled:opacity-50 rounded",
      },
    }),
  },
};

export default config;
