function parseOnOff(refs) {
      const onParsed = [];

      if (Array.isArray(refs)) {
        for (const value of refs) {
          if (!(0, _primitives.isRef)(value)) {
            continue;
          }

          if (contentGroupRefs.includes(value)) {
            onParsed.push(value.toString());
          }
        }
      }

      return onParsed;
    }