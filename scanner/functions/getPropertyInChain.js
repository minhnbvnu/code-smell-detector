function getPropertyInChain(base, chain) {
        var pos = chain.indexOf(".");
        if (pos === -1) {
          return {
            base: base,
            prop: chain
          };
        }
        var prop = chain.slice(0, pos);
        if (base === null) {
          return {
            base: base,
            prop: prop,
            chain: chain
          };
        }
        var nextBase = base[prop];
        chain = chain.slice(pos + 1);
        if ((base instanceof Object || typeof base === "object") && isEmptyObject(base)) {
          return {
            base: base,
            prop: prop,
            chain: chain
          };
        }
        if (nextBase === null) {
          return {
            base: base,
            prop: prop,
            chain: chain
          };
        }
        if (nextBase !== undefined) {
          return getPropertyInChain(nextBase, chain);
        }
        Object.defineProperty(base, prop, {
          configurable: true
        });
        return {
          base: base,
          prop: prop,
          chain: chain
        };
      }