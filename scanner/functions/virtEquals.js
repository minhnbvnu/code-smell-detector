function virtEquals(obj, other) {
    if (obj === null || other === null) return obj === null && other === null;
    if (typeof obj === "string") return obj === other;
    if (typeof obj !== "object") return obj === other;
    if (obj.equals instanceof Function) return obj.equals(other);
    return obj === other
  }