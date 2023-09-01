import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/translate.mjs',
        format: 'es',
      },
      {
        file: 'dist/translate.cjs',
        format: 'cjs',
      },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/translate.d.ts',
      format: 'es',
    },
    plugins: [typescript(), dts()],
  },
]
