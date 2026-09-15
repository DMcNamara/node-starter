import { parseArgs } from "node:util";
import { code } from "./code";

const {
  positionals: [name, age],
} = parseArgs({ allowPositionals: true });

code(name, Number(age));
