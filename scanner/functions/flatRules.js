function flatRules(element) {
		var result = [];
		jQuery.each($(element).rules(), function(key, value) { result.push(key); });
		return result.join(" ");
	}