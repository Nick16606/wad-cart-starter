import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
const noVat = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }

test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  assert.equal(cartTotal(items, options), 467400)
})

test('empty cart returns 0 (no VAT, no shipping)', () => {
  assert.equal(cartTotal([], options), 0)
})

test('subtotal exactly at the threshold ships free', () => {
  const items = [{ name: 'A', price: 250000, qty: 2 }]
  assert.equal(cartTotal(items, noVat), 500000)
})

test('subtotal just below the threshold pays shipping', () => {
  const items = [{ name: 'A', price: 499999, qty: 1 }]
  assert.equal(cartTotal(items, noVat), 529999)
})

test('free shipping is decided on the subtotal before VAT', () => {
  // subtotal 480000 < 500000, even though 480000 + VAT 38400 > 500000
  const items = [{ name: 'A', price: 480000, qty: 1 }]
  assert.equal(cartTotal(items, options), 548400)
})

test('qty 0 throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: 100, qty: 0 }], options), RangeError)
})

test('qty -1 throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: 100, qty: -1 }], options), RangeError)
})

test('qty 1.5 throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: 100, qty: 1.5 }], options), RangeError)
})

test('qty "2" (string) throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: 100, qty: '2' }], options), RangeError)
})

test('qty NaN throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: 100, qty: NaN }], options), RangeError)
})

test('qty undefined throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: 100 }], options), RangeError)
})

test('price -1 throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: -1, qty: 1 }], options), RangeError)
})

test('price NaN throws RangeError', () => {
  assert.throws(() => cartTotal([{ name: 'A', price: NaN, qty: 1 }], options), RangeError)
})

test('price 0 is valid', () => {
  const items = [{ name: 'Free sample', price: 0, qty: 3 }]
  // subtotal 0 < threshold, so shipping applies
  assert.equal(cartTotal(items, options), 30000)
})

test('a half dong rounds up with Math.round', () => {
  const items = [{ name: 'A', price: 100, qty: 1 }]
  // 100 + 12.5 VAT, free shipping (threshold 100) = 112.5 -> 113
  assert.equal(cartTotal(items, { vatRate: 0.125, freeShipFrom: 100, shipFee: 30000 }), 113)
})

test('rounds once at the end, not per line', () => {
  const items = [
    { name: 'A', price: 1, qty: 1 },
    { name: 'B', price: 1, qty: 1 },
    { name: 'C', price: 1, qty: 1 },
  ]
  // 3 + 1.2 VAT = 4.2 -> 4. Rounding each line's 1.4 first would give 3.
  assert.equal(cartTotal(items, { vatRate: 0.4, freeShipFrom: 0, shipFee: 30000 }), 4)
})

test('returns a Number that is an integer', () => {
  const items = [{ name: 'A', price: 333, qty: 3 }]
  const result = cartTotal(items, { vatRate: 0.07, freeShipFrom: 0, shipFee: 0 })
  assert.equal(typeof result, 'number')
  assert.ok(Number.isInteger(result))
})