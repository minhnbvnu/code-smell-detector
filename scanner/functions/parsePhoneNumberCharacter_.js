function parsePhoneNumberCharacter_(character, prevParsedCharacters, context) {
	// `context` argument was added as a third argument of `parse()` function
	// in `input-format` package on Dec 26th, 2023. So it could potentially be
	// `undefined` here if a 3rd-party app somehow ends up with this newer version
	// of `react-phone-number-input` and an older version of `input-format`.
	// Dunno how, but just in case, it could be `undefined` here and it wouldn't break.
	// Maybe it's not required to handle `undefined` case here.
	//
	// The addition of the `context` argument was to fix the slightly-weird behavior
	// of parsing an input string when the user inputs something like `"2+7"
	// https://github.com/catamphetamine/react-phone-number-input/issues/437
	//
	// If the parser encounters an unexpected `+` in a string being parsed
	// then it simply discards that out-of-place `+` and any following characters.
	//
	if (context && context.ignoreRest) {
		return
	}

	const emitEvent = (eventName) => {
		if (context) {
			switch (eventName) {
				case 'end':
					context.ignoreRest = true
					break
			}
		}
	}

	return parsePhoneNumberCharacter(character, prevParsedCharacters, emitEvent)
}