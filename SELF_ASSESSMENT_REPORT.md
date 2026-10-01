# Self-assessment — 24120316

| # | Criterion | Max | Claimed | Evidence |
|---|---|---|---|---|
| 1 | cartTotal behaves as specified | 30 | 25 | `src/cart.js`: result is `Math.round(subtotal + vat + shipping)`, so it is a number; `assertValidLine` throws `RangeError` for price < 0 / non-finite and for qty that is not a positive integer; empty cart returns `0` before any VAT or shipping; free shipping uses `subtotal >= freeShipFrom` on the subtotal before VAT. Tests: "the example from the slides" (467400), "subtotal exactly at the threshold ships free", "empty cart returns 0 (no VAT, no shipping)". `npm test`: 18 of 18 pass. Manual REPL check: [[results, or "not done"]] |
| 2 | Tests | 20 | 15 | `test/cart.test.js`, 18 tests, each with one assertion: "the example from the slides"; "empty cart returns 0 (no VAT, no shipping)"; "subtotal exactly at the threshold ships free"; "subtotal just below the threshold pays shipping"; "free shipping is decided on the subtotal before VAT"; "qty 0 throws RangeError"; "qty -1 throws RangeError"; "qty 1.5 throws RangeError"; "qty "2" (string) throws RangeError"; "qty NaN throws RangeError"; "qty undefined throws RangeError"; "price -1 throws RangeError"; "price NaN throws RangeError"; "price 0 is valid"; "a half dong rounds up with Math.round"; "rounds once at the end, not per line"; "returns a number"; "returns a whole number of dong". Two tests I added at the end first failed with `ReferenceError` (undeclared `items`/`opts`) and were fixed; see AI-LOG.md. |
| 3 | The harness | 20 | 20 | Rules file: [[file name, e.g. CLAUDE.md]] (stack, commands, "Never" line); gates: `npm test` (node:test) and `npm run format` (Prettier via `npx`, config in `.prettierrc`, no dependency added); CI: `.github/workflows/ci.yml` runs both on push, latest run is green: [[link to the Actions run]]. `package.json` has no `dependencies`. |
| 4 | The brief | 15 | 15 | `BRIEF.md`: "Files" (may touch / must not touch), "Contract" (inputs, outputs, rounding, shipping rule), error cases (price < 0, qty not a positive integer), and "no dependencies" under "What to build" and "Must not". |
| 5 | AI-LOG.md | 15 | 15 | `AI-LOG.md`: tool used, what it produced, what I changed and caught (the `ReferenceError` in two tests, the CRLF format failure), what I wrote by hand. Commits: [[hash(es) from `git log --oneline`]] |
| | **Total** | 100 | **90** | |

## What I did not manage

- There is no linter, only a Prettier format check, so the second gate is formatting rather than static analysis.
- I created most of `AI-LOG.md` after the code and tests were already written, not entry by entry during the work. [[confirm or correct this line]]
- [[anything else, e.g. "I did not run the REPL edge-case checks by hand", or delete this line]]
