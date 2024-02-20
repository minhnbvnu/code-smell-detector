function transitionsIdentical(oldTransition, targetName, providedModelsArray) {

      if (oldTransition.targetName !== targetName) { return false; }

      var oldModels = oldTransition.providedModelsArray;
      if (oldModels.length !== providedModelsArray.length) { return false; }

      for (var i = 0, len = oldModels.length; i < len; ++i) {
        if (oldModels[i] !== providedModelsArray[i]) { return false; }
      }
      return true;
    }