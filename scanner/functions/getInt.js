function getInt(linDict, name, allowZeroValue = false) {
      const obj = linDict.get(name);

      if (Number.isInteger(obj) && (allowZeroValue ? obj >= 0 : obj > 0)) {
        return obj;
      }

      throw new Error(`The "${name}" parameter in the linearization ` + "dictionary is invalid.");
    }