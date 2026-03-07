import { code } from "./code";

const args = process.argv.slice(2);
code(args[0], Number(args[1]));
