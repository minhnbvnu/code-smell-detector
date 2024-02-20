function booleanScalar(val) {
      if (typeof val === "number") return val !== 0;
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val.toLowerCase() === "true";
      if (val instanceof Char) return val.code === 49 || val.code === 84 || val.code === 116
    }