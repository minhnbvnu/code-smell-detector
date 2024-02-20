function arrayLiteralType(elements, scope, inner) {
    var tuple = elements.length > 1 && elements.length < 6;

    if (tuple) {
      var homogenous = true,
          litType;

      for (var i = 0; i < elements.length; i++) {
        var elt = elements[i];
        if (!elt) tuple = false;else if (elt.type != "Literal" || litType && litType != typeof elt.value) homogenous = false;else litType = typeof elt.value;
      }

      if (homogenous) tuple = false;
    }

    if (tuple) {
      var types = [];

      for (var i = 0; i < elements.length; ++i) types.push(inner(elements[i], scope));

      return new Arr(types);
    } else if (elements.length < 2) {
      return new Arr(elements[0] && inner(elements[0], scope));
    } else {
      var eltVal = new AVal();

      for (var i = 0; i < elements.length; i++) if (elements[i]) inner(elements[i], scope).propagate(eltVal);

      return new Arr(eltVal);
    }
  }