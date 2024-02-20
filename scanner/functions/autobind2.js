function autobind2(obj) {
    let predefined = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["constructor"];
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