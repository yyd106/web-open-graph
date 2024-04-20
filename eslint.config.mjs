import path from 'path';
import { fileURLToPath } from 'url';

import mantle from '@mantle-dapp/tools-config/eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...mantle,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: [
      '**/generated/**-wagmi.ts',
      '**/generated/blockchain.ts',
      '**/components/shared/table/**',
      '**/generated',
      '.next/**',
      'tailwind.config.js',
    ],
  },
];
