function iterObj(o, f) {
    for (var prop in o) if (o.hasOwnProperty(prop)) f(prop, o[prop]);
  }