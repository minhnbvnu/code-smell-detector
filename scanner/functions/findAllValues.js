function findAllValues(obj, keyArray, keyName, path) {
  path = path || "$";
  for (const prop of Object.keys(obj)) {
    if (prop === keyName) {
      let values = obj[prop];
      if (Array.isArray(values)) {
        values = obj[prop][instrisicFunctionIndex(prop)];
      }

      if (!Array.isArray(values)) {
        values = [values];
      }

      if (prop === "Fn::Sub") {
        const pattern = /\$\{(.+?)\}/g;
        let match;
        const multiValue = [];
        while ((match = pattern.exec(values[0])) != null) {
          multiValue.push([match[1].split(".")[0]]);
        }
        values = multiValue.map((p) => p[0]);
      }
      if (prop === "Fn::ImportValue") {
        const split = typeof values[0] ==="string" && values[0].split(":");
        if (split.length == 2) {
          const stackName = split[0];
          const exportName = split[1];
          const value = templateCache.templates[stackName] ? templateCache.templates[stackName].Outputs[exportName].Value : {"Fn::ImportValue": "Unknown"};
          const intrinsicFunction = Object.keys(value)[0];
          const prefix = stackName === templateCache.rootTemplate ? "root" : stackName;
          values[0] = `${prefix}.${value[intrinsicFunction]}`;
        }
      }

      values = [values];

      for (const v of values) {
        const item = {
          key: prop,
          value: v.filter((p) => typeof p === "string" && !p.startsWith("AWS::")),
          path: path.split(".Fn::")[0],
        };
        if (item.value.length) {
          keyArray.push(item);
        }
      }
    }
    if (
      !obj[prop] ||
      typeof obj[prop] !== "object" ||
      typeof obj[prop] === "string" ||
      obj[prop] instanceof String
    ) {
      continue;
    }

    if (Array.isArray(obj[prop])) {
      obj[prop].forEach((child, i) =>
        findAllValues(child, keyArray, keyName, `${path}.${prop}`)
      );
    } else {
      findAllValues(obj[prop], keyArray, keyName, `${path}.${prop}`);
    }
  }
}