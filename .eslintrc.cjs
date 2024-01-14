module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 6,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:react-hooks/recommended', // Replace 'airbnb/hooks' with this
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
  },
}
