function _skip() {
      parsed = _parsed[i];
      const otherValue = parsed[otherScale.axis];
      return !isFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
    }