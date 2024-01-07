function closePendingRestoreOPS(argument) {
      for (var i = 0, ii = preprocessor.savedStatesDepth; i < ii; i++) {
        operatorList.addOp(_util.OPS.restore, []);
      }
    }