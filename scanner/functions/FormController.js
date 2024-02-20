function FormController(element, attrs, $scope, $animate, $interpolate) {
  var form = this,
      controls = [];

  // init state
  form.$error = {};
  form.$$success = {};
  form.$pending = undefined;
  form.$name = $interpolate(attrs.name || attrs.ngForm || '')($scope);
  form.$dirty = false;
  form.$pristine = true;
  form.$valid = true;
  form.$invalid = false;
  form.$submitted = false;
  form.$$parentForm = nullFormCtrl;

  /**
   * @ngdoc method
   * @name form.FormController#$rollbackViewValue
   *
   * @description
   * Rollback all form controls pending updates to the `$modelValue`.
   *
   * Updates may be pending by a debounced event or because the input is waiting for a some future
   * event defined in `ng-model-options`. This method is typically needed by the reset button of
   * a form that uses `ng-model-options` to pend updates.
   */
  form.$rollbackViewValue = function() {
    forEach(controls, function(control) {
      control.$rollbackViewValue();
    });
  };

  /**
   * @ngdoc method
   * @name form.FormController#$commitViewValue
   *
   * @description
   * Commit all form controls pending updates to the `$modelValue`.
   *
   * Updates may be pending by a debounced event or because the input is waiting for a some future
   * event defined in `ng-model-options`. This method is rarely needed as `NgModelController`
   * usually handles calling this in response to input events.
   */
  form.$commitViewValue = function() {
    forEach(controls, function(control) {
      control.$commitViewValue();
    });
  };

  /**
   * @ngdoc method
   * @name form.FormController#$addControl
   * @param {object} control control object, either a {@link form.FormController} or an
   * {@link ngModel.NgModelController}
   *
   * @description
   * Register a control with the form. Input elements using ngModelController do this automatically
   * when they are linked.
   *
   * Note that the current state of the control will not be reflected on the new parent form. This
   * is not an issue with normal use, as freshly compiled and linked controls are in a `$pristine`
   * state.
   *
   * However, if the method is used programmatically, for example by adding dynamically created controls,
   * or controls that have been previously removed without destroying their corresponding DOM element,
   * it's the developers responsibility to make sure the current state propagates to the parent form.
   *
   * For example, if an input control is added that is already `$dirty` and has `$error` properties,
   * calling `$setDirty()` and `$validate()` afterwards will propagate the state to the parent form.
   */
  form.$addControl = function(control) {
    // Breaking change - before, inputs whose name was "hasOwnProperty" were quietly ignored
    // and not added to the scope.  Now we throw an error.
    assertNotHasOwnProperty(control.$name, 'input');
    controls.push(control);

    if (control.$name) {
      form[control.$name] = control;
    }

    control.$$parentForm = form;
  };

  // Private API: rename a form control
  form.$$renameControl = function(control, newName) {
    var oldName = control.$name;

    if (form[oldName] === control) {
      delete form[oldName];
    }
    form[newName] = control;
    control.$name = newName;
  };

  /**
   * @ngdoc method
   * @name form.FormController#$removeControl
   * @param {object} control control object, either a {@link form.FormController} or an
   * {@link ngModel.NgModelController}
   *
   * @description
   * Deregister a control from the form.
   *
   * Input elements using ngModelController do this automatically when they are destroyed.
   *
   * Note that only the removed control's validation state (`$errors`etc.) will be removed from the
   * form. `$dirty`, `$submitted` states will not be changed, because the expected behavior can be
   * different from case to case. For example, removing the only `$dirty` control from a form may or
   * may not mean that the form is still `$dirty`.
   */
  form.$removeControl = function(control) {
    if (control.$name && form[control.$name] === control) {
      delete form[control.$name];
    }
    forEach(form.$pending, function(value, name) {
      form.$setValidity(name, null, control);
    });
    forEach(form.$error, function(value, name) {
      form.$setValidity(name, null, control);
    });
    forEach(form.$$success, function(value, name) {
      form.$setValidity(name, null, control);
    });

    arrayRemove(controls, control);
    control.$$parentForm = nullFormCtrl;
  };


  /**
   * @ngdoc method
   * @name form.FormController#$setValidity
   *
   * @description
   * Sets the validity of a form control.
   *
   * This method will also propagate to parent forms.
   */
  addSetValidityMethod({
    ctrl: this,
    $element: element,
    set: function(object, property, controller) {
      var list = object[property];
      if (!list) {
        object[property] = [controller];
      } else {
        var index = list.indexOf(controller);
        if (index === -1) {
          list.push(controller);
        }
      }
    },
    unset: function(object, property, controller) {
      var list = object[property];
      if (!list) {
        return;
      }
      arrayRemove(list, controller);
      if (list.length === 0) {
        delete object[property];
      }
    },
    $animate: $animate
  });

  /**
   * @ngdoc method
   * @name form.FormController#$setDirty
   *
   * @description
   * Sets the form to a dirty state.
   *
   * This method can be called to add the 'ng-dirty' class and set the form to a dirty
   * state (ng-dirty class). This method will also propagate to parent forms.
   */
  form.$setDirty = function() {
    $animate.removeClass(element, PRISTINE_CLASS);
    $animate.addClass(element, DIRTY_CLASS);
    form.$dirty = true;
    form.$pristine = false;
    form.$$parentForm.$setDirty();
  };

  /**
   * @ngdoc method
   * @name form.FormController#$setPristine
   *
   * @description
   * Sets the form to its pristine state.
   *
   * This method can be called to remove the 'ng-dirty' class and set the form to its pristine
   * state (ng-pristine class). This method will also propagate to all the controls contained
   * in this form.
   *
   * Setting a form back to a pristine state is often useful when we want to 'reuse' a form after
   * saving or resetting it.
   */
  form.$setPristine = function() {
    $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + ' ' + SUBMITTED_CLASS);
    form.$dirty = false;
    form.$pristine = true;
    form.$submitted = false;
    forEach(controls, function(control) {
      control.$setPristine();
    });
  };

  /**
   * @ngdoc method
   * @name form.FormController#$setUntouched
   *
   * @description
   * Sets the form to its untouched state.
   *
   * This method can be called to remove the 'ng-touched' class and set the form controls to their
   * untouched state (ng-untouched class).
   *
   * Setting a form controls back to their untouched state is often useful when setting the form
   * back to its pristine state.
   */
  form.$setUntouched = function() {
    forEach(controls, function(control) {
      control.$setUntouched();
    });
  };

  /**
   * @ngdoc method
   * @name form.FormController#$setSubmitted
   *
   * @description
   * Sets the form to its submitted state.
   */
  form.$setSubmitted = function() {
    $animate.addClass(element, SUBMITTED_CLASS);
    form.$submitted = true;
    form.$$parentForm.$setSubmitted();
  };
}