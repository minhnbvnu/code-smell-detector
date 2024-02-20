function wrapChildAsAsync(child) {
      return { fn: function(done) { child.execute(done); } };
    }