function rossmoFormula(a, ns, B, k, f, g) {
    return k * ns.reduce(function(acc, n) {
      const d = Math.abs(a.x - n.x) + Math.abs(a.y - n.y)
      if (!d) {
        return acc; // not sure if I need the 1 there
      } else if (d > B) {
        return acc + 1 / Math.pow(d, f);
      } else {
        return acc + Math.pow(B, g - f) / Math.pow(d, g);
      }
    }, 0); // not sure if this ought to be at least 1
  }