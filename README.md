# node-starter

A minimal starter template for Node.js/TypeScript CLI scripts. It's not an
application with real domain logic — just a small, working skeleton (build,
test, lint all wired up) to fork when starting a new script project.

## What's here

- [src/index.ts](src/index.ts) — entry point. Parses CLI args with Node's
  built-in `parseArgs` and delegates to `code`.
- [src/code.ts](src/code.ts) — example function the entry point calls into.
  New functionality should follow this pattern: a thin `index.ts` calling
  testable exported functions from sibling files.
- [src/code.spec.ts](src/code.spec.ts) — example Jest test for `code.ts`.

TypeScript is pinned to the 6.x line (not TS7's native compiler), which keeps
`ts-node`/`ts-jest` running `.ts` source directly without a build step. See
[CLAUDE.md](CLAUDE.md) for the full rationale and project conventions.

## Running it

Install dependencies:

```
npm install
```

Run directly (no build step, via `ts-node`):

```
npm start -- <name> <age>
```

Build to `dist/` and run compiled output:

```
npm run build
node dist/index.js <name> <age>
```

## Testing

```
npm test          # run the full Jest suite once
npm run test:watch  # rerun tests related to files changed since the last commit
npx jest -t "should print"  # run a single test by name
```

## Linting

```
npm run lint       # ESLint (typescript-eslint, type-checked) + Prettier check
npm run lint:fix    # auto-fix both where possible
```
