/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./formkit.config.js",
  "./node_modules/vue-tailwind-datepicker/**/*.js",
];
export const theme = {
  extend: {
    colors: {
      "vtd-primary": colors.indigo,
      "vtd-secondary": colors.gray,
    },
  },
};
export const plugins = [require("@tailwindcss/forms")];
