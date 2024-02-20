function getSupport() {
      if (!support) {
        support = calcSupport();
      }

      return support;
    }