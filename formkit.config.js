import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      text: {
        message: "text-red-500",
      },
      number: {
        message: "text-red-500",
      },
      file: {
        message: "text-red-500",
      },
    }),
  },
};

export default config;
