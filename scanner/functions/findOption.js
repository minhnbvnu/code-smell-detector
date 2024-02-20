function findOption(attrs) {
	var brPhoneMaskOption = brPhoneMaskOptions.all;

	if (attrs && attrs.uiBrPhoneNumberMask) {
		var maskOption = attrs.uiBrPhoneNumberMask;
		angular.forEach(brPhoneMaskOptions, function(value, key) {
			if (key === maskOption) {
				brPhoneMaskOption = value;
				return;
			}
		});
	}

	return brPhoneMaskOption;
}