import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import svg from "rollup-plugin-svg";
import { terser } from "rollup-plugin-terser";
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        globals: { react: "React" },
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
        globals: { react: "React" },
      },
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
      }),
      postcss({
        plugins: [],
        modules: true,
        minimize: true,
      }),
      commonjs({
        include: "node_modules/**",
        namedExports: {
          "node_modules/react-is/index.js": [
            "isValidElementType",
            "isContextConsumer",
          ],
          "node_modules/use-sync-external-store/shim/with-selector.js": [
            "useSyncExternalStoreWithSelector",
          ],
          "node_modules/use-sync-external-store/shim/index.js": [
            "useSyncExternalStore",
          ],
        },
      }),
      svg(),
      external(),
      resolve({ extensions: [".js", ".jsx", ".json"] }),
      terser(),
    ],
  },
];
