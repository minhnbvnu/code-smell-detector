function setValidity(validationErrorKey, state, controller) {
    if (isUndefined(state)) {
      createAndSet('$pending', validationErrorKey, controller);
    } else {
      unsetAndCleanup('$pending', validationErrorKey, controller);
    }
    if (!isBoolean(state)) {
      unset(ctrl.$error, validationErrorKey, controller);
      unset(ctrl.$$success, validationErrorKey, controller);
    } else {
      if (state) {
        unset(ctrl.$error, validationErrorKey, controller);
        set(ctrl.$$success, validationErrorKey, controller);
      } else {
        set(ctrl.$error, validationErrorKey, controller);
        unset(ctrl.$$success, validationErrorKey, controller);
      }
    }
    if (ctrl.$pending) {
      cachedToggleClass(PENDING_CLASS, true);
      ctrl.$valid = ctrl.$invalid = undefined;
      toggleValidationCss('', null);
    } else {
      cachedToggleClass(PENDING_CLASS, false);
      ctrl.$valid = isObjectEmpty(ctrl.$error);
      ctrl.$invalid = !ctrl.$valid;
      toggleValidationCss('', ctrl.$valid);
    }

    // re-read the state as the set/unset methods could have
    // combined state in ctrl.$error[validationError] (used for forms),
    // where setting/unsetting only increments/decrements the value,
    // and does not replace it.
    var combinedState;
    if (ctrl.$pending && ctrl.$pending[validationErrorKey]) {
      combinedState = undefined;
    } else if (ctrl.$error[validationErrorKey]) {
      combinedState = false;
    } else if (ctrl.$$success[validationErrorKey]) {
      combinedState = true;
    } else {
      combinedState = null;
    }

    toggleValidationCss(validationErrorKey, combinedState);
    ctrl.$$parentForm.$setValidity(validationErrorKey, combinedState, ctrl);
  }