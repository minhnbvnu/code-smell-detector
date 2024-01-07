constructor(nsId, name, attributes = {}) {
    super(nsId, name);
    this[$content] = "";
    this[_dataValue] = null;

    if (name !== "#text") {
      const map = new Map();
      this[_attributes] = map;

      for (const [attrName, value] of Object.entries(attributes)) {
        map.set(attrName, new XFAAttribute(this, attrName, value));
      }

      if (attributes.hasOwnProperty($nsAttributes)) {
        const dataNode = attributes[$nsAttributes].xfa.dataNode;

        if (dataNode !== undefined) {
          if (dataNode === "dataGroup") {
            this[_dataValue] = false;
          } else if (dataNode === "dataValue") {
            this[_dataValue] = true;
          }
        }
      }
    }

    this[$consumed] = false;
  }