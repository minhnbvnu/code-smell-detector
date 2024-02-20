function makeSubmitHandler( form ) {
    return function () {

        // Turn off placeholders on all appropriate descendant elements.
        disablePlaceholders(form);
    };
  }