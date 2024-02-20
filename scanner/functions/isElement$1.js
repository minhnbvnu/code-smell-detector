function isElement$1(x2) {
    if (!x2 || typeof x2 !== "object") {
      return false;
    }
    if (typeof HTMLElement !== "undefined" && x2 instanceof HTMLElement) {
      return true;
    }
    return typeof x2.nodeName === "string" && typeof x2.getAttribute === "function";
  }