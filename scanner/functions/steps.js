function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }