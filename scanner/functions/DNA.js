function DNA(total, order) {

  // Start assuming it's distance is infinity and fitness is zero
  this.dist = Infinity;
  this.fitness = 0;

  // Is this being made from another DNA object?
  if (order instanceof Array) {
    // Just copy the order
    this.order = order.slice();
    // Mutation
    // 50% of the time shuffle one spot to see if it improves
    if (random(1) < 0.05) {
      this.shuffle();
    }
  } else {

    // Create a random order
    this.order = [];
    for (var i = 0; i < total; i++) {
      this.order[i] = i;
    }

    // Shuffle randomly 100 times
    // Is this good enough for variation?
    for (var n = 0; n < 100; n++) {
      this.shuffle();
    }
  }
}