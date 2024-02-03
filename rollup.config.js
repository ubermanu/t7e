import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/transplate.mjs',
        format: 'es',
      },
      {
        file: 'dist/transplate.cjs',
        format: 'cjs',
      },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/transplate.d.ts',
      format: 'es',
    },
    plugins: [typescript(), dts()],
  },
]
