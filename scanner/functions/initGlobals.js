function initGlobals(attribute, type) {
      if (useFastMode) {
        // Note: this is not giving correct results for warnings.
        // But it's much faster.
        if (pool[0]) {
          return pool[0].globals;
        }
      } else {
        document.title = `${attribute.name} (${type.name})`;
      }

      // Creating globals for every single test is too slow.
      // However caching them between runs won't work for the same attribute names
      // because warnings will be deduplicated. As a result, we only share globals
      // between different attribute names.
      for (let i = 0; i < pool.length; i++) {
        if (!pool[i].testedAttributes.has(attribute.name)) {
          pool[i].testedAttributes.add(attribute.name);
          return pool[i].globals;
        }
      }

      let globals = {};
      Object.keys(sources).forEach((name, i) => {
        eval.call(window, codesByIndex[i]); // eslint-disable-line
        globals[name] = window[name.replace(/Stable|Next/g, '')];
      });

      // Cache for future use (for different attributes).
      pool.push({
        globals,
        testedAttributes: new Set([attribute.name]),
      });

      return globals;
    }