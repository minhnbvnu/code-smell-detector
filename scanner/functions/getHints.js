function getHints(linDict) {
      const hints = linDict.get("H");
      let hintsLength;

      if (Array.isArray(hints) && ((hintsLength = hints.length) === 2 || hintsLength === 4)) {
        for (let index = 0; index < hintsLength; index++) {
          const hint = hints[index];

          if (!(Number.isInteger(hint) && hint > 0)) {
            throw new Error(`Hint (${index}) in the linearization dictionary is invalid.`);
          }
        }

        return hints;
      }

      throw new Error("Hint array in the linearization dictionary is invalid.");
    }