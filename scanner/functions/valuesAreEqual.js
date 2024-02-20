function valuesAreEqual(value1, value2) {
	// If `value` has been set to `null` externally then convert it to `undefined`.
	//
	// For example, `react-hook-form` sets `value` to `null` when the user clears the input.
	// https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/164
	// In that case, without this conversion of `null` to `undefined`, it would reset
	// the selected country to `defaultCountry` because in that case `newValue !== value`
	// because `null !== undefined`.
	//
	// Historically, empty `value` is encoded as `undefined`.
	// Perhaps empty `value` would be better encoded as `null` instead.
	// But because that would be a potentially breaking change for some people,
	// it's left as is for the current "major" version of this library.
	//
	if (value1 === null) {
		value1 = undefined
	}
	if (value2 === null) {
		value2 = undefined
	}
	return value1 === value2
}