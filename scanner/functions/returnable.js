function returnable(stopped, step2) {
        var isStep = step2 || false;
        return {
          data: isStep ? data[0] : data,
          errors,
          meta: {
            delimiter: delim,
            linebreak: newline,
            aborted,
            truncated: !!stopped,
            cursor: lastCursor + (baseIndex || 0)
          }
        };
      }