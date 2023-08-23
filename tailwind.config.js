/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./formkit.config.js",
];
export const theme = {
  extend: {},
};
export const plugins = [require("@tailwindcss/forms")];
