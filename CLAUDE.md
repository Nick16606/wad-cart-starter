# Project rules

Stack: plain JavaScript (ESM), Node >= 22. No dependencies, ever.
Commands: npm test (node:test) · npm run format (prettier check)
Files: edit only src/cart.js and test/cart.test.js.
Style: 2-space indent, no semicolons, single quotes, named exports only.
Contract: cartTotal(items, options) returns a Number that is an integer (whole dong).
Errors: invalid price/qty throws RangeError. Never swallow errors (no empty catch).
Never: add packages, edit package.json, use toFixed (returns a string), invent APIs.
Tests: assert the spec, not the implementation; one reason to fail per test.