function getPhoneDigitsForValue(
	value,
	country,
	international,
	withCountryCallingCode,
	defaultCountry,
	useNationalFormatForDefaultCountryValue,
	metadata,
	onCountryMismatch
) {
	if (country && international && withCountryCallingCode) {
		const prefix = getInternationalPhoneNumberPrefix(country, metadata)
		if (value) {
			if (value.indexOf(prefix) !== 0) {
				onCountryMismatch(value, country)
			}
			return value
		}
		return prefix
	}
	if (!value) {
		return ''
	}
	if (!country && !defaultCountry) {
		return value
	}
	const asYouType = new AsYouType(undefined, metadata)
	asYouType.input(value)
	const phoneNumber = asYouType.getNumber()
	if (phoneNumber) {
		if (country) {
			if (phoneNumber.country && phoneNumber.country !== country) {
				onCountryMismatch(value, country, phoneNumber.country)
			} else if (phoneNumber.countryCallingCode !== getCountryCallingCode(country, metadata)) {
				onCountryMismatch(value, country)
			}
			if (international) {
				return phoneNumber.nationalNumber
			}
			return parseDigits(phoneNumber.formatNational())
		} else {
			// `phoneNumber.countryCallingCode` is compared here  instead of
			// `phoneNumber.country`, because, for example, a person could have
			// previously input a phone number (in "national" format) that isn't
			// 100% valid for the `defaultCountry`, and if `phoneNumber.country`
			// was compared, then it wouldn't match, and such phone number
			// wouldn't be formatted as a "national" one, and instead would be
			// formatted as an "international" one, confusing the user.
			// Comparing `phoneNumber.countryCallingCode` works around such issues.
			//
			// Example: `defaultCountry="US"` and the `<input/>` is empty.
			// The user inputs: "222 333 4444", which gets formatted to "(222) 333-4444".
			// The user then clicks "Save", the page is refreshed, and the user sees
			// that the `<input/>` value is now "+1 222 333 4444" which confuses the user:
			// the user expected the `<input/>` value to be "(222) 333-4444", same as it
			// was when they've just typed it in. The cause of the issue is that "222 333 4444"
			// is not a valid national number for US, and `phoneNumber.country` is compared
			// instead of `phoneNumber.countryCallingCode`. After the `phoneNumber.country`
			// comparison is replaced with `phoneNumber.countryCallingCode` one, the issue
			// is no longer the case.
			//
			if (phoneNumber.countryCallingCode && phoneNumber.countryCallingCode === getCountryCallingCode(defaultCountry, metadata) && useNationalFormatForDefaultCountryValue) {
				return parseDigits(phoneNumber.formatNational())
			}
			return value
		}
	} else {
		return ''
	}
}