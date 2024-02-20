function matchesParams() {
        return !params || equalForKeys(params, $stateParams);
      }