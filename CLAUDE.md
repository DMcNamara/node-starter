# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run build` — compile `src/` to `dist/` via `tsc`.
- `npm start` — run `src/index.ts` directly via `ts-node` (no build step).
- `npm test` — run Jest; `ts-jest` transforms `.ts` files on the fly, no precompile step.
- `npm run test:watch` — Jest watch mode (reruns tests related to files changed since the last commit).
- To run a single test: `npx jest -t "should print"`.
- `npm run lint` — ESLint (`typescript-eslint`'s type-checked recommended rules) plus a Prettier formatting check. `npm run lint:fix` auto-fixes both where possible.

## Architecture

This is a minimal starter template for Node.js/TypeScript CLI scripts, not an application with real domain logic yet.

- **TypeScript is pinned to the 6.x line**, not TypeScript 7. TS7 ships a native (Go-based) compiler that drops the JS compiler API — `ts-jest` and `ts-node` both depend on that API and hard-crash under TS7. Staying on 6.x keeps the fast dev loop (Jest/`ts-node` run `.ts` source directly, no `tsc` precompile step) working. Revisit this once `ts-jest`/`ts-node` add native TS7 support.
- **Two tsconfigs**: `tsconfig.json` is the "real" config — used for the `npm run build` production build (excludes `*.spec.ts`) and as the base ESLint's type-aware parser and `tsconfig.test.json` both extend. `tsconfig.test.json` adds spec files and Jest's ambient types on top, and is what `ts-jest` and ESLint actually use.
- Both tsconfigs set `"types": ["node"]` explicitly — even on TypeScript 6.x, automatic discovery of `@types/*` packages (e.g. `process`, `Buffer` from `@types/node`) doesn't happen by default the way it did on TS 5.x, so this must be listed explicitly or globals fail to resolve.
- **ESLint** (`eslint.config.js`, flat config) runs `typescript-eslint`'s `recommendedTypeChecked` rules against `tsconfig.test.json`, plus `eslint-config-prettier` to disable any formatting-related rules so Prettier stays the single source of truth for formatting. `*.spec.ts` files relax the `no-unsafe-*` rules, since Jest mock helpers (e.g. `jest.fn()`) are typed loosely enough to otherwise trigger them constantly.
- Entry point `src/index.ts` reads CLI args from `process.argv` and delegates to functions in sibling files (e.g. `src/code.ts`); new functionality should follow this pattern of a thin entry point calling into testable exported functions.
