function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
      if (value instanceof Array) {
        var arr = [];
        for (var i = 0, len = value.length; i < len; i++) arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
        return arr
      }
      return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group)
    }