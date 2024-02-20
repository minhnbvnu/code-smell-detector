function nodeSmallerThan(node, n) {
    try {
      walk.simple(node, {
        Expression: function () {
          if (--n <= 0) throw NotSmaller;
        }
      });
      return true;
    } catch (e) {
      if (e == NotSmaller) return false;
      throw e;
    }
  }