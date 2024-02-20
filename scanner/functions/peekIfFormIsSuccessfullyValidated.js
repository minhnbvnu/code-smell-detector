function peekIfFormIsSuccessfullyValidated($form, excludeInputElement, config) {
    var allValid = true;
    $form.find('[data-validation]').each(function() {
      if (this !== excludeInputElement) {
        var $elem = $(this),
          hasSuccessfullyValidated = $elem.hasClass(config.successElementClass),
          isOptional = $elem.valAttr('optional') === 'true',
          isInvalid = $elem.hasClass(config.errorElementClass);
        if (isInvalid || (!hasSuccessfullyValidated && !isOptional)) {
          allValid = false;
          return false;
        }
      }
    });
    return allValid;
  }