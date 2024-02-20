function checkModifier(mod) {
    // Loop through operators
    Object.keys(mod).forEach((op) => {
      const opObj = mod[op];
      // If non-operators are mixed in, throw error
      if (op.slice(0, 1) !== '$') {
        throw new Error(`Expected '${op}' to be a modifier operator like '$set'`);
      }
      if (shouldCheck(op)) {
        // For an upsert, missing props would not be set if an insert is performed,
        // so we check them all with undefined value to force any 'required' checks to fail
        if (isUpsert && (op === '$set' || op === '$setOnInsert')) {
          const presentKeys = Object.keys(opObj);
          schema.objectKeys().forEach((schemaKey) => {
            if (!presentKeys.includes(schemaKey)) {
              checkObj({
                val: undefined,
                affectedKey: schemaKey,
                operator: op,
              });
            }
          });
        }
        // Don't use forEach here because it will not properly handle an
        // object that has a property named `length`
        Object.keys(opObj).forEach((k) => {
          let v = opObj[k];
          if (op === '$push' || op === '$addToSet') {
            if (typeof v === 'object' && '$each' in v) {
              v = v.$each;
            } else {
              k = `${k}.0`;
            }
          }
          checkObj({
            val: v,
            affectedKey: k,
            operator: op,
          });
        });
      }
    });
  }