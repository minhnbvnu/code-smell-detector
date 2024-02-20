function priceInsideRange(products, range) {
  return products.filter(r => range.inside(r.price));
}