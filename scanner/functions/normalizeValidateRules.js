function normalizeValidateRules(validate, rules, validateTrigger) {
	  var validateRules = validate.map(function (item) {
	    var newItem = (0, _extends3['default'])({}, item, {
	      trigger: item.trigger || []
	    });
	    if (typeof newItem.trigger === 'string') {
	      newItem.trigger = [newItem.trigger];
	    }
	    return newItem;
	  });
	  if (rules) {
	    validateRules.push({
	      trigger: validateTrigger ? [].concat(validateTrigger) : [],
	      rules: rules
	    });
	  }
	  return validateRules;
	}