function assertValidLine(item) {
  const { price, qty } = item
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    throw new RangeError(`price must be a finite number >= 0, got ${price}`)
  }
  if (!Number.isInteger(qty) || qty <= 0) {
    throw new RangeError(`qty must be a positive integer, got ${qty}`)
  }
}

export function cartTotal(items, options) {
  if (items.length === 0) return 0

  const { vatRate, freeShipFrom, shipFee } = options

  let subtotal = 0
  for (const item of items) {
    assertValidLine(item)
    subtotal += item.price * item.qty
  }

  const vat = subtotal * vatRate
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee

  return Math.round(subtotal + vat + shipping)
}
