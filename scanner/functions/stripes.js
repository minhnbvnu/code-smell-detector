function stripes(a, b) {
  return {type: "Polygon", coordinates: [a, b].map(function(d, i) {
    const stripe = range(-180, 180, 0.1).map(function(x) { return [x, d]; });
    stripe.push(stripe[0]);
    return i ? stripe.reverse() : stripe;
  })};
}