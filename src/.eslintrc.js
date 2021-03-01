module.exports = {
  extends: ["react-app", "react-app/jest"],
  overrides: [
    {
      files: ["*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "no-unneeded-ternary": "error",
    "prefer-arrow-callback": "error",
  },
};
