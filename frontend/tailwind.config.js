module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        xl: "0 31px 22px -3px rgb(0 0 0), 0 13px 10px -1px rgb(0 0 0)",
        "xl-dark":
          "0 0px 2px 1px rgb(109 105 105), 0 10px 9px -6px rgb(109 105 105)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
  darkMode: "class",
  plugins: [],
};
