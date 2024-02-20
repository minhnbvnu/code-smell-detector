function usePhoneDigits({
	value,
	onChange,
	country,
	defaultCountry,
	international,
	withCountryCallingCode,
	useNationalFormatForDefaultCountryValue,
	metadata
}) {
	const countryMismatchDetected = useRef()
	const onCountryMismatch = (value, country, actualCountry) => {
		console.error(`[react-phone-number-input] Expected phone number ${value} to correspond to country ${country} but ${actualCountry ? 'in reality it corresponds to country ' + actualCountry : 'it doesn\'t'}.`)
		countryMismatchDetected.current = true
	}

	const getInitialPhoneDigits = (options) => {
		return getPhoneDigitsForValue(
			value,
			country,
			international,
			withCountryCallingCode,
			defaultCountry,
			useNationalFormatForDefaultCountryValue,
			metadata,
			(...args) => {
				if (options && options.onCountryMismatch) {
					options.onCountryMismatch()
				}
				onCountryMismatch.apply(this, args)
			}
		)
	}

	// This is only used to detect `country` property change.
	const [prevCountry, setPrevCountry] = useState(country)
	// This is only used to detect `defaultCountry` property change.
	const [prevDefaultCountry, setPrevDefaultCountry] = useState(defaultCountry)
	// `phoneDigits` is the `value` passed to the `<input/>`.
	const [phoneDigits, setPhoneDigits] = useState(getInitialPhoneDigits())
	// This is only used to detect `value` property changes.
	const [valueForPhoneDigits, setValueForPhoneDigits] = useState(value)

	// Rerender hack.
	const [rerenderTrigger, setRerenderTrigger] = useState()
	const rerender = useCallback(() => setRerenderTrigger({}), [setRerenderTrigger])

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

	// If `value` property has been changed externally
	// then re-initialize the component.
	useEffect(() => {
		if (value !== valueForPhoneDigits) {
			setValueForPhoneDigits(value)
			setPhoneDigits(getInitialPhoneDigits())
		}
	}, [value])

	// If the `country` has been changed then re-initialize the component.
	useEffect(() => {
		if (country !== prevCountry) {
			setPrevCountry(country)
			let countryMismatchDetected
			const phoneDigits = getInitialPhoneDigits({
				onCountryMismatch() {
					countryMismatchDetected = true
				}
			})
			setPhoneDigits(phoneDigits)
			if (countryMismatchDetected) {
				setValueForPhoneDigits(getValueForPhoneDigits(phoneDigits))
			}
		}
	}, [country])

	// If the `defaultCountry` has been changed then re-initialize the component.
	useEffect(() => {
		if (defaultCountry !== prevDefaultCountry) {
			setPrevDefaultCountry(defaultCountry)
			setPhoneDigits(getInitialPhoneDigits())
		}
	}, [defaultCountry])

	// Update the `value` after `valueForPhoneDigits` has been updated.
	useEffect(() => {
		if (valueForPhoneDigits !== value) {
			onChange(valueForPhoneDigits)
		}
	}, [valueForPhoneDigits])

	const onSetPhoneDigits = useCallback((phoneDigits) => {
		let value
		if (country) {
			if (international && withCountryCallingCode) {
				// The `<input/>` value must start with the country calling code.
				const prefix = getInternationalPhoneNumberPrefix(country, metadata)
				if (phoneDigits.indexOf(prefix) !== 0) {
					// If a user tabs into a phone number input field
					// that is `international` and `withCountryCallingCode`,
					// and then starts inputting local phone number digits,
					// the first digit would get "swallowed" if the fix below wasn't implemented.
					// https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/43
					if (phoneDigits && phoneDigits[0] !== '+') {
						phoneDigits = prefix + phoneDigits
					} else {
						// // Reset phone digits if they don't start with the correct prefix.
						// // Undo the `<input/>` value change if it doesn't.
						if (countryMismatchDetected.current) {
							// In case of a `country`/`value` mismatch,
							// if it performed an "undo" here, then
							// it wouldn't let a user edit their phone number at all,
							// so this special case at least allows phone number editing
							// when `value` already doesn't match the `country`.
						} else {
							// If it simply did `phoneDigits = prefix` here,
							// then it could have no effect when erasing phone number
							// via Backspace, because `phoneDigits` in `state` wouldn't change
							// as a result, because it was `prefix` and it became `prefix`,
							// so the component wouldn't rerender, and the user would be able
							// to erase the country calling code part, and that part is
							// assumed to be non-eraseable. That's why the component is
							// forcefully rerendered here.
							setPhoneDigits(prefix)
							setValueForPhoneDigits(undefined)
							// Force a re-render of the `<input/>` with previous `phoneDigits` value.
							return rerender()
						}
					}
				}
			} else {
				// Entering phone number either in "national" format
				// when `country` has been specified, or in "international" format
				// when `country` has been specified but `withCountryCallingCode` hasn't.
				// Therefore, `+` is not allowed.
				if (phoneDigits && phoneDigits[0] === '+') {
					// Remove the `+`.
					phoneDigits = phoneDigits.slice(1)
				}
			}
		} else if (!defaultCountry) {
			// Force a `+` in the beginning of a `value`
			// when no `country` and `defaultCountry` have been specified.
			if (phoneDigits && phoneDigits[0] !== '+') {
				// Prepend a `+`.
				phoneDigits = '+' + phoneDigits
			}
		}
		// Convert `phoneDigits` to `value`.
		if (phoneDigits) {
			value = getValueForPhoneDigits(phoneDigits)
		}
		setPhoneDigits(phoneDigits)
		setValueForPhoneDigits(value)
	}, [
		country,
		international,
		withCountryCallingCode,
		defaultCountry,
		metadata,
		setPhoneDigits,
		setValueForPhoneDigits,
		rerender,
		countryMismatchDetected
	])

	return [
		phoneDigits,
		onSetPhoneDigits
	]
}