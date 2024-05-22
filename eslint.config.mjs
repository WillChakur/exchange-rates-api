import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}, rules: { quotes: ["error", "double", {avoidEscape: true}]}},
  {languageOptions: { globals: {...globals.browser, ...globals.node, ...globals.jest} }},
  pluginJs.configs.recommended,
];