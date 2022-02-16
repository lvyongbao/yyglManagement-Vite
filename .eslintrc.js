module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/alt-text': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', './'],
          ['@utils', './src/utils'],
          ['@public', './src/public'],
          ['@components', './src/components'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
