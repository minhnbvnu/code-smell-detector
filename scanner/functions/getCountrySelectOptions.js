function getCountrySelectOptions({
	countries,
	countryNames,
	addInternationalOption,
	// `locales` are only used in country name comparator:
	// depending on locale, string sorting order could be different.
	compareStringsLocales,
	compareStrings: _compareStrings
}) {
	// Default country name comparator uses `String.localeCompare()`.
	if (!_compareStrings) {
		_compareStrings = compareStrings
	}

	// Generates a `<Select/>` option for each country.
	const countrySelectOptions = countries.map((country) => ({
		value: country,
		// All `locale` country names included in this library
		// include all countries (this is checked at build time).
		// The only case when a country name might be missing
		// is when a developer supplies their own `labels` property.
		// To guard against such cases, a missing country name
		// is substituted by country code.
		label: countryNames[country] || country
	}))

	// Sort the list of countries alphabetically.
	countrySelectOptions.sort((a, b) => _compareStrings(a.label, b.label, compareStringsLocales))

	// Add the "International" option to the country list (if suitable)
	if (addInternationalOption) {
		countrySelectOptions.unshift({
			label: countryNames.ZZ
		})
	}

	return countrySelectOptions
}