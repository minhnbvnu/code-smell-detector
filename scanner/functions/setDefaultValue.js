function setDefaultValue() {
      /* istanbul ignore else */
      if (__DEV__) {
        if (isRaw) {
          warn(
            `missingInitialValue.${key}`,
            `The initial value for input "${name}" is missing. Custom inputs ` +
              'controlled with raw() are expected to have an initial value ' +
              'provided to useFormState(). To prevent React from treating ' +
              'this input as uncontrolled, an empty string will be used instead.',
          );
        }
      }

      let value = '';
      if (isCheckbox) {
        /**
         * If a checkbox has a user-defined value, its value the form state
         * value will be an array. Otherwise it will be considered a toggle.
         */
        value = hasOwnValue ? [] : false;
      }
      if (isSelectMultiple) {
        value = [];
      }
      formState.setValues({ [name]: value });
    }