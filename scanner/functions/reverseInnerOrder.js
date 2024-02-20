function reverseInnerOrder(layering) {
    layering.forEach(function(layer) {
      layer.reverse();
    });
  }