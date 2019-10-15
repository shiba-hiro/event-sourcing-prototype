module.exports = {
    "extends": [
      "airbnb",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
    ],
    "plugins": [
      "@typescript-eslint",
      "import",
    //   "jest",
    ],
    "env": {
      "node": true,
      "es6": true,
    //   "jest": true
    },
    "globals": {
      "__DEV__": false,
    },
    "parser": "@typescript-eslint/parser",
    "rules": {
      "import/extensions": [
        0
      ],
      "camelcase": [0],
      "no-underscore-dangle": 0,
      "global-require": 0,
      "no-use-before-define": 0,
      "import/prefer-default-export": [0],
      "indent": "off",
      "@typescript-eslint/indent": ["error", 2],
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "no-mixed-operators": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "max-len": "off",
      "no-console": "off",
    },
    "overrides": [
      { // No need to declare return type for describe, it, etc...
        "files": ["*.spec.ts"],
        "rules": {
          "@typescript-eslint/explicit-function-return-type" : "off",
        },
      },
      {
        "files": ["*.ts"],
        "rules": {
          "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
              "allowExpressions": true,
            }
          ],
          "@typescript-eslint/no-unused-vars": "error",
        },
      },
    ],
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [
            ".ts",
          ],
        },
      },
    },
  }