function priceOutSideRange(products, range) {
  return products.filter(r => range.outside(r.price));
}