function setupTypedArray(name, fallback) {
    if (name in window) return window[name];
    if (typeof window[fallback] === "function") return window[fallback];
    return function(obj) {
      if (obj instanceof Array) return obj;
      if (typeof obj === "number") {
        var arr = [];
        arr.length = obj;
        return arr
      }
    }
  }