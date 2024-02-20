function hasNativeSupport() {
      for (var namespace of [scope, scope.CSS]) {
        if (namespace.animationWorklet && namespace.animationWorklet.addModule)
          return true;
      }
      return false;
    }