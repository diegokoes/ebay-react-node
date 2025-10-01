import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      import: importPlugin,
      "check-file": checkFile,
    },

    rules: {
      // Forbid cross-feature imports and enforce unidirectional architecture (shared -> features -> app)
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Disallow cross-feature imports (allow only intra-feature). Add more features as you create them.
            {
              target: "./src/features/auth",
              from: "./src/features",
              except: ["./auth"],
            },
            {
              target: "./src/features/catalog",
              from: "./src/features",
              except: ["./catalog"],
            },
            {
              target: "./src/features/cart",
              from: "./src/features",
              except: ["./cart"],
            },
            {
              target: "./src/features/checkout",
              from: "./src/features",
              except: ["./checkout"],
            },
            {
              target: "./src/features/payments",
              from: "./src/features",
              except: ["./payments"],
            },
            {
              target: "./src/features/messaging",
              from: "./src/features",
              except: ["./messaging"],
            },
            {
              target: "./src/features/orders",
              from: "./src/features",
              except: ["./orders"],
            },
            {
              target: "./src/features/profile",
              from: "./src/features",
              except: ["./profile"],
            },

            // Enforce unidirectional codebase: features cannot import from app
            { target: "./src/features", from: "./src/app" },

            // Shared modules should not import upward from features/app
            {
              target: [
                "./src/components",
                "./src/hooks",
                "./src/lib",
                "./src/types",
                "./src/utils",
                "./src/assets",
                "./src/api", // treat top-level api as shared if used
              ],
              from: ["./src/features", "./src/app"],
            },
          ],
        },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          // all folders within src (except __tests__)should be named in kebab-case
          "src/**/!(__tests__)": "KEBAB_CASE",
        },
      ],
    },
  },
]);
