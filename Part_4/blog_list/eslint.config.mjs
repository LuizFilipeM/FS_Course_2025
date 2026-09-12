import globals from "globals";
import pluginJs from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  pluginJs.configs.recommended,
  {
    ignores: [
      "eslint.config.mjs",
    ]
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest
      }
    },
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "never"],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
          'error', 'always'
      ],
      'arrow-spacing': [
          'error', { 'before': true, 'after': true }
      ],
      'no-console': 'off',
    }
  }
]);