AI-LOG

Fill in every [[...]] with what really happened, then delete this line. Commit this file after each work session so it matches git log.

[[2026-09-30]] — Harness (rules file, format gate, CI)

Tool: Claude (claude.ai chat), used as a step-by-step guide. [[add any other tool, or "none"]] Asked for: how to set up the harness for this assignment: a rules file, a format gate, and CI. It produced: templates for the rules file, .prettierrc, the format script in package.json, and .github/workflows/ci.yml. Changed: [[what you changed in those templates, e.g. file name of the rules file, lines you added or removed]] Rejected: [[anything you did not use, or "nothing"]] Wrote by hand: [[e.g. "I created the files myself, ran npm test red first, enabled Actions on my fork"]] Gate chosen: npm test (node:test) and npm run format (Prettier via npx, so package.json has no dependencies). Commit: [[hash]]

[[2026-09-30]] — Brief

Tool: Claude (claude.ai chat) for a template; [[adapted by me]]. Asked for: the structure of a brief (files, contract, error cases, "no dependencies"). It produced: a BRIEF.md template. Changed: [[what you edited, e.g. added "Must not touch .prettierrc and .github/"]] Wrote by hand: [[the decisions: round once with Math.round at the end; free-shipping check on the subtotal before VAT]] Commit: [[hash]]

[[2026-09-30]] — cartTotal and tests (loop 1)

Tool: [[tool and model that wrote src/cart.js and test/cart.test.js]]. Asked for: implement cartTotal(items, options) in src/cart.js and tests in test/cart.test.js from BRIEF.md and the rules file. It produced: src/cart.js with a helper assertValidLine and cartTotal; 16 tests covering the slide example, empty cart, threshold (at and just below), VAT-before-shipping, qty 0 / -1 / 1.5 / "2" / NaN / undefined, price -1 / NaN / 0, half-dong rounding, and rounding once.

Caught by reading the diff:

[[e.g. "no toFixed, result comes from Math.round"]]
[[e.g. "no new package, package.json only gained the format script"]]
[[e.g. "no empty catch block"]]
[[add anything else you actually noticed, or write "nothing found"]]

Caught by the gates:

npm test failed on returns a number with ReferenceError: items is not defined. Cause: the last two tests (returns a number, returns a whole number of dong) used the variables items and opts, which do not exist in the file. The test was broken, not cartTotal. [[Who wrote those two tests: me / the assistant]]. Fix: each test now declares its own items and uses the shared options. Result: 18 of 18 pass.
npm run format failed on src/cart.js. Cause: Windows CRLF line endings versus Prettier's LF. Fix: prettier --write and "endOfLine": "auto" in .prettierrc. [[confirm what you did]]

Rejected: [[anything from the assistant's output you did not keep, or "nothing"]] Added to the rules file after these failures: [[e.g. "Every test declares its own data; no undeclared variables."]] Already ruled out by my brief: [[e.g. "toFixed / string result, qty 1.5, threshold with >=, no dependencies"]] Wrote by hand: [[e.g. "the two final tests and their fix; the manual REPL checks"]] Manual checks in the Node REPL: [[list what you ran and the results, e.g. 467400, 0, 540000, 569999, price -1 / qty 0 / qty 1.5 throw RangeError; or "not done"]] Commit: [[hash(es)]]

Other issues
git push returned 403 because Git Credential Manager held another GitHub account (ThaiHoang16) while the fork belongs to Nick16606. Fixed by [[what you did, e.g. removing the stored credential / switching account]]. This was not related to the code.
What I did not manage

[[Be direct, e.g. "no linter, only a format check"; or "nothing missing"]]