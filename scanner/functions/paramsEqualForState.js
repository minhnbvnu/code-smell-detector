function paramsEqualForState(ownParams, stateParams, stateParams2) {
        if (typeof ownParams.$$equals === 'function')
          return ownParams.$$equals(stateParams, stateParams2);
        return equalForKeys(stateParams, stateParams2, ownParams);
      }