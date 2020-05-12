'use strict';

module.exports = {
  plugins: [
    'eslint-comments',
    'import',
    'jsdoc',
    'lodash',
    'node',
    'unicorn'
  ],
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:lodash/recommended',
    'plugin:node/recommended',
    'plugin:unicorn/recommended'
  ],
  parser: 'babel-eslint',
  env: {
    jasmine: true,
    node: true
  },
  rules: {
    complexity: ['error', 15],
    indent: ['error', 2],
    'object-curly-newline': ['warn', { consistent: true, minProperties: 6 }],
    'require-jsdoc': 'off',
    'valid-jsdoc': [
      'warn',
      {
        prefer: {
          arg: 'param',
          return: 'returns'
        },
        preferType: {
          Boolean: 'boolean',
          Number: 'number',
          String: 'string',
          object: 'Object',
          array: 'Array',
          date: 'Date',
          regexp: 'RegExp',
          Regexp: 'RegExp',
          promise: 'Promise'
        },
        requireParamDescription: false,
        requireParamType: true,
        requireReturn: false,
        requireReturnDescription: false,
        requireReturnType: true
      }
    ],
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'off',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/require-description-complete-sentence': 'off',
    'jsdoc/require-example': 'off',
    'jsdoc/require-hyphen-before-param-description': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns-type': 'off',

    'generator-star-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'class-methods-use-this': 'off',
    'no-warning-comments': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-useless-escape': 'off',
    'no-console': 'warn',
    'spaced-comment': 'off',
    'require-yield': 'off',
    'prefer-template': 'warn',
    'no-underscore-dangle': 'off',
    'comma-dangle': ['warn', 'never'],
    strict: 'off',
    'guard-for-in': 'off',
    'object-shorthand': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'brace-style': [2, '1tbs'],
    'max-classes-per-file': 'warn',
    'max-len': [
      2,
      {
        code: 100,
        ignorePattern: '(https?:|JSON\\.parse|[Uu]rl =)',
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'arrow-parens': ['error', 'always'],
    'prefer-destructuring': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'implicit-arrow-linebreak': 'off',

    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/disable-enable-pair': [
      'error',
      { allowWholeFile: true }
    ],

    'lodash/import-scope': ['error', 'method'],
    'lodash/prefer-constant': 'off',
    'lodash/prefer-lodash-method': 'off',

    'node/no-missing-require': 'off',

    'unicorn/better-regex': 'off',
    'unicorn/catch-error-name': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-for-loop': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/no-zero-fractions': 'off',
    'unicorn/prefer-flat-map': 'off',
    'unicorn/prefer-negative-index': 'off',
    'unicorn/prefer-number-properties': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prefer-string-slice': 'off',
    'unicorn/prefer-trim-start-end': 'off',
    'unicorn/prevent-abbreviations': 'off'
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint'
      ],
      extends: ['airbnb-typescript/lib/shared'],
      rules: {
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        'comma-dangle': ['warn', 'never'],
        'import/prefer-default-export': 'off',
        'lines-between-class-members': 'off',
        'lodash/prefer-lodash-typecheck': 'off',
        'node/no-unsupported-features/es-syntax': 'off'
      }
    },
    {
      files: [
        '**/bin/**/*.js',
        '**/spec/**/*.js',
        'packages/api/migrations/**/*.js',
        'packages/deployment/**/*.js',
        'tf-modules/internal/cumulus-test-cleanup/**/*.js'
      ],
      rules: { 'no-console': 'off' }
    },
    {
      files: ['**/test/**/*.js', '**/tests/**/*.js'],
      rules: {
        'max-classes-per-file': 'off',
        'no-console': 'off',
        'no-new': 'off',
        'no-param-reassign': 'off'
      }
    }
  ]
};
