import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: pluginPrettier,
    },
  },
];
