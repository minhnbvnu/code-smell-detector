function parseOrder(refs, nestedLevels = 0) {
      if (!Array.isArray(refs)) {
        return null;
      }

      const order = [];

      for (const value of refs) {
        if ((0, _primitives.isRef)(value) && contentGroupRefs.includes(value)) {
          parsedOrderRefs.put(value);
          order.push(value.toString());
          continue;
        }

        const nestedOrder = parseNestedOrder(value, nestedLevels);

        if (nestedOrder) {
          order.push(nestedOrder);
        }
      }

      if (nestedLevels > 0) {
        return order;
      }

      const hiddenGroups = [];

      for (const groupRef of contentGroupRefs) {
        if (parsedOrderRefs.has(groupRef)) {
          continue;
        }

        hiddenGroups.push(groupRef.toString());
      }

      if (hiddenGroups.length) {
        order.push({
          name: null,
          order: hiddenGroups
        });
      }

      return order;
    }