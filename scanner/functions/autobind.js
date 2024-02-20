function autobind(obj, predefined = ["constructor"]) {
    const proto = Object.getPrototypeOf(obj);
    const propNames = Object.getOwnPropertyNames(proto);
    for (const key of propNames) {
      if (typeof obj[key] === "function") {
        if (!predefined.find((name8) => key === name8)) {
          obj[key] = obj[key].bind(obj);
        }
      }
    }
  }