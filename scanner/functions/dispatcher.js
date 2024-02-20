function dispatcher(that, argumentz) {
    return function(type) {
      var e = d3.event;
      try {
        d3.event = {type: type, target: brush};
        event[type].apply(that, argumentz);
      } finally {
        d3.event = e;
      }
    };
  }