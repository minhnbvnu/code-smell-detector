function fillFormWithValuesAndExpect(formSelector, inputValues, expected) {
	for (var i=0; i < inputValues.length; i++) {
		$(formSelector + ' input:eq(' + i + ')').val(inputValues[i]);
	}
	var actual = $(formSelector).valid();
	equal(actual, expected, $.format("Filled inputs of form '{0}' with {1} values ({2})", formSelector, inputValues.length, inputValues.toString()));

}