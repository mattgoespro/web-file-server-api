/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json"
      },
      node: true,
      webpack: {
        config: "./webpack.config.ts"
      }
    }
  },
  ignorePatterns: [".eslintrc.js", "dist", "media"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^[_(function)]",
        ignoreRestSiblings: true,
        varsIgnorePattern: "functions.*"
      }
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "type", "parent", "sibling"],
        warnOnUnassignedImports: true,
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          orderImportKind: "asc"
        }
      }
    ],
    "import/no-named-as-default-member": "off"
  },
  env: {
    es2020: true,
    node: true
  }
};
