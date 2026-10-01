# Brief: cartTotal

## What to build
Implement `cartTotal(items, options)` in `src/cart.js`. Plain JavaScript, no dependencies.

## Files
May touch: `src/cart.js`, `test/cart.test.js`.
Must not touch: `package.json`, `.gitignore`, `README.md`, anything else.

## Contract
- items: `[{ name, price, qty }]`; options: `{ vatRate, freeShipFrom, shipFee }`
- subtotal = sum of price * qty
- VAT = subtotal * vatRate
- shipping = 0 if subtotal >= freeShipFrom (compare the subtotal BEFORE VAT), otherwise shipFee
- return subtotal + VAT + shipping, as a Number, rounded ONCE at the end with Math.round
- empty array returns 0 (no VAT, no shipping)
- price < 0 throws RangeError
- qty that is not a positive integer (0, -1, 1.5, "2", NaN, undefined) throws RangeError
- price 0 is valid

## Worked example
[{ name: 'Áo thun', price: 180000, qty: 2 }, { name: 'Sổ tay', price: 45000, qty: 1 }]
with { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 } returns 467400
(405000 + 32400 + 30000).

## Done when
`npm test` is green and tests cover: the example, empty cart, subtotal exactly at the
threshold, subtotal just below it, qty 0 / -1 / 1.5, price -1, price 0, rounding, and
the return type (number, integer).

## Must not
- add any dependency or edit package.json
- use toFixed or return a string
- use try/catch that swallows an error
- write tests that only mirror the implementation
- invent functions or Node APIs