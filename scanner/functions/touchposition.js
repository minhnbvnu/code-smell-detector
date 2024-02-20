function touchposition(parent, id) {
      return d3.touches(parent).filter(function(p) {
        return p.identifier === id;
      })[0];
    }