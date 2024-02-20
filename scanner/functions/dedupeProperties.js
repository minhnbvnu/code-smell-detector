function dedupeProperties(properties) {
    const knownProps = /* @__PURE__ */ new Map();
    const deduped = [];
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      if (prop.key.type === 8 || !prop.key.isStatic) {
        deduped.push(prop);
        continue;
      }
      const name = prop.key.content;
      const existing = knownProps.get(name);
      if (existing) {
        if (name === "style" || name === "class" || isOn(name)) {
          mergeAsArray(existing, prop);
        }
      } else {
        knownProps.set(name, prop);
        deduped.push(prop);
      }
    }
    return deduped;
  }