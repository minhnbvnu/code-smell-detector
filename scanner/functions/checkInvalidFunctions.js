function checkInvalidFunctions(ttContext, maxFunctionDefs) {
        if (ttContext.tooComplexToFollowFunctions) {
          return;
        }

        if (ttContext.functionsDefined.length > maxFunctionDefs) {
          (0, _util.warn)("TT: more functions defined than expected");
          ttContext.hintsValid = false;
          return;
        }

        for (var j = 0, jj = ttContext.functionsUsed.length; j < jj; j++) {
          if (j > maxFunctionDefs) {
            (0, _util.warn)("TT: invalid function id: " + j);
            ttContext.hintsValid = false;
            return;
          }

          if (ttContext.functionsUsed[j] && !ttContext.functionsDefined[j]) {
            (0, _util.warn)("TT: undefined function: " + j);
            ttContext.hintsValid = false;
            return;
          }
        }
      }