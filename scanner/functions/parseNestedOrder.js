function parseNestedOrder(ref, nestedLevels) {
      if (++nestedLevels > MAX_NESTED_LEVELS) {
        (0, _util.warn)("parseNestedOrder - reached MAX_NESTED_LEVELS.");
        return null;
      }

      const value = xref.fetchIfRef(ref);

      if (!Array.isArray(value)) {
        return null;
      }

      const nestedName = xref.fetchIfRef(value[0]);

      if (typeof nestedName !== "string") {
        return null;
      }

      const nestedOrder = parseOrder(value.slice(1), nestedLevels);

      if (!nestedOrder || !nestedOrder.length) {
        return null;
      }

      return {
        name: (0, _util.stringToPDFString)(nestedName),
        order: nestedOrder
      };
    }