function getValueForPhoneDigits(phoneDigits) {
		// If the user hasn't input any digits then `value` is `undefined`.
		if (!phoneDigits) {
			return
		}
		if (country && international && !withCountryCallingCode) {
			phoneDigits = `+${getCountryCallingCode(country, metadata)}${phoneDigits}`
		}
		// Return the E.164 phone number value.
		//
		// Even if no "national (significant) number" digits have been input,
		// still return a non-`undefined` value.
		// https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/113
		//
		// For example, if the user has selected country `US` and entered `"1"`
		// then that `"1"` is just a "national prefix" and no "national (significant) number"
		// digits have been input yet. Still, return `"+1"` as `value` in such cases,
		// because otherwise the app would think that the input is empty and mark it as such
		// while in reality it isn't empty, which might be thought of as a "bug", or just
		// a "weird" behavior.
		//
		// The only case when there's any input and `getNumberValue()` still returns `undefined`
		// is when that input is `"+"`.
		//
		const asYouType = new AsYouType(country || defaultCountry, metadata)
		asYouType.input(phoneDigits)
		return asYouType.getNumberValue()
	}