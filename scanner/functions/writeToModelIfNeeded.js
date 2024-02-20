function writeToModelIfNeeded() {
      if (ctrl.$modelValue !== prevModelValue) {
        ctrl.$$writeModelToScope();
      }
    }