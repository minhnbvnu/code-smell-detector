function uniformMatrix(cacheId, programObj, varName, transpose, matrix) {
      var varLocation = curContextCache.locations[cacheId];
      if (varLocation === undef) {
        varLocation = curContext.getUniformLocation(programObj, varName);
        curContextCache.locations[cacheId] = varLocation
      }
      if (varLocation !== -1) if (matrix.length === 16) curContext.uniformMatrix4fv(varLocation, transpose, matrix);
      else if (matrix.length === 9) curContext.uniformMatrix3fv(varLocation, transpose, matrix);
      else curContext.uniformMatrix2fv(varLocation, transpose, matrix)
    }