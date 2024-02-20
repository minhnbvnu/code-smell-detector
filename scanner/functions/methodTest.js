function methodTest( methodName ) {
	var v = jQuery("#form").validate();
	var method = $.validator.methods[methodName];
	var element = $("#firstname")[0];
	return function(value, param) {
		element.value = value;
		return method.call( v, value, element, param );
	};
}