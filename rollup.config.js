import pkg from "./package.json";
import blogCompiler from "./rollup-plugin-blog-compiler";

export default {
  input: pkg.main,
  outpus: {
    file: "./js/bundle.js",
    format: "iife",
  },
  plugins: [blogCompiler],
};
