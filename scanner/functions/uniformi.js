function uniformi(cacheId, programObj, varName, varValue) {
      var varLocation = curContextCache.locations[cacheId];
      if (varLocation === undef) {
        varLocation = curContext.getUniformLocation(programObj, varName);
        curContextCache.locations[cacheId] = varLocation
      }
      if (varLocation !== null) if (varValue.length === 4) curContext.uniform4iv(varLocation, varValue);
      else if (varValue.length === 3) curContext.uniform3iv(varLocation, varValue);
      else if (varValue.length === 2) curContext.uniform2iv(varLocation, varValue);
      else curContext.uniform1i(varLocation, varValue)
    }