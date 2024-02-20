function validateRequiredCldr( path, value ) {
	validateCldr( path, value, {
		skip: [
			/dates\/calendars\/gregorian\/dateTimeFormats\/availableFormats/,
			/dates\/calendars\/gregorian\/days\/.*\/short/,
			/dates\/timeZoneNames\/zone/,
			/dates\/timeZoneNames\/metazone/,
			/globalize-iana/,
			/supplemental\/metaZones/,
			/supplemental\/timeData\/(?!001)/,
			/supplemental\/weekData\/(?!001)/
		]
	});
}