function updateOptionElement(option, element) {
        option.element = element;
        element.disabled = option.disabled;
        // NOTE: The label must be set before the value, otherwise IE10/11/EDGE create unresponsive
        // selects in certain circumstances when multiple selects are next to each other and display
        // the option list in listbox style, i.e. the select is [multiple], or specifies a [size].
        // See https://github.com/angular/angular.js/issues/11314 for more info.
        // This is unfortunately untestable with unit / e2e tests
        if (option.label !== element.label) {
          element.label = option.label;
          element.textContent = option.label;
        }
        if (option.value !== element.value) element.value = option.selectValue;
      }