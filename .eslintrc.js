/** @type {Partial<import('eslint').Linter.RulesRecord>} */
const rules = {
  curly: ['error', 'multi-line'],
  eqeqeq: ['error', 'smart'],
  'capitalized-comments': ['off'],
  'no-eq-null': ['off'],
};
/** @type {{ rules: import('eslint').Linter.RulesRecord, extends: string[] }} */
const tsOverrideConfig = {
  extends: ['xo', 'xo-typescript', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    ...rules,
    '@typescript-eslint/consistent-indexed-object-style': [
      'error',
      'index-signature',
    ],
    '@typescript-eslint/padding-line-between-statements': ['off'],
    '@typescript-eslint/ban-types': ['error', {}],
  },
};

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['xo', 'prettier', 'plugin:prettier/recommended'],
  rules,
  overrides: [
    {
      files: ['vite.config.ts'],
      parserOptions: {
        project: 'tsconfig.json',
      },
      ...tsOverrideConfig,
    },
    {
      files: ['src/**/*.{ts,tsx}'],
      parserOptions: {
        project: 'src/tsconfig.json',
      },
      ...tsOverrideConfig,
      extends: [...tsOverrideConfig.extends, 'plugin:react-hooks2/recommended'],
    },
    {
      files: ['config/**/*.ts'],
      parserOptions: {
        project: 'config/tsconfig.json',
      },
      ...tsOverrideConfig,
    },
    {
      files: ['*.config.js'],
      rules: {
        'unicorn/prefer-module': 'off',
        '@typescript-eslint/no-throw-literal': ['off'],
      },
    },
  ],
};
module.exports = config;
