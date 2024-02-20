function toP5String(obj) {
      if (obj instanceof String) return obj;
      if (typeof obj === "number") {
        if (obj === (0 | obj)) return obj.toString();
        return p.nf(obj, 0, 3)
      }
      if (obj === null || obj === undef) return "";
      return obj.toString()
    }