module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    api: 'readonly'
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  overrides: [{
    files: ['src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }],
  rules: {
  }
}
