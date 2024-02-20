function setSizes(newSizes) {
      newSizes.forEach(function(newSize, i) {
        if (i > 0) {
          var pair = pairs[i - 1];
          var a = elements[pair.a];
          var b = elements[pair.b];

          a.size = newSizes[i - 1];
          b.size = newSize;

          setElementSize(a.element, a.size, pair.aGutterSize);
          setElementSize(b.element, b.size, pair.bGutterSize);
        }
      });
    }