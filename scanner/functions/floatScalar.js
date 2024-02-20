function floatScalar(val) {
      if (typeof val === "number") return val;
      if (typeof val === "boolean") return val ? 1 : 0;
      if (typeof val === "string") return parseFloat(val);
      if (val instanceof Char) return val.code
    }