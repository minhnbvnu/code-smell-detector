function quoteRegexp(str) {
      return (str + '').replace(/([.?*+\^$\[\]\\(){}|-])/g, '\\$1');
    }