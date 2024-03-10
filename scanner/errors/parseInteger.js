function parseInteger(str, uopts)
{
	mod_assert.string(str, 'str');
	mod_assert.optionalObject(uopts, 'options');

	var baseOverride = false;
	var options = PI_DEFAULTS;

	if (uopts) {
		baseOverride = hasKey(uopts, 'base');
		options = mergeObjects(options, uopts);
		mod_assert.number(options.base, 'options.base');
		mod_assert.ok(options.base >= 2, 'options.base >= 2');
		mod_assert.ok(options.base <= 36, 'options.base <= 36');
		mod_assert.bool(options.allowSign, 'options.allowSign');
		mod_assert.bool(options.allowPrefix, 'options.allowPrefix');
		mod_assert.bool(options.allowTrailing,
		    'options.allowTrailing');
		mod_assert.bool(options.allowImprecise,
		    'options.allowImprecise');
		mod_assert.bool(options.trimWhitespace,
		    'options.trimWhitespace');
		mod_assert.bool(options.leadingZeroIsOctal,
		    'options.leadingZeroIsOctal');

		if (options.leadingZeroIsOctal) {
			mod_assert.ok(!baseOverride,
			    '"base" and "leadingZeroIsOctal" are ' +
			    'mutually exclusive');
		}
	}

	var c;
	var pbase = -1;
	var base = options.base;
	var start;
	var mult = 1;
	var value = 0;
	var idx = 0;
	var len = str.length;

	/* Trim any whitespace on the left side. */
	if (options.trimWhitespace) {
		while (idx < len && isSpace(str.charCodeAt(idx))) {
			++idx;
		}
	}

	/* Check the number for a leading sign. */
	if (options.allowSign) {
		if (str[idx] === '-') {
			idx += 1;
			mult = -1;
		} else if (str[idx] === '+') {
			idx += 1;
		}
	}

	/* Parse the base-indicating prefix if there is one. */
	if (str[idx] === '0') {
		if (options.allowPrefix) {
			pbase = prefixToBase(str.charCodeAt(idx + 1));
			if (pbase !== -1 && (!baseOverride || pbase === base)) {
				base = pbase;
				idx += 2;
			}
		}

		if (pbase === -1 && options.leadingZeroIsOctal) {
			base = 8;
		}
	}

	/* Parse the actual digits. */
	for (start = idx; idx < len; ++idx) {
		c = translateDigit(str.charCodeAt(idx));
		if (c !== -1 && c < base) {
			value *= base;
			value += c;
		} else {
			break;
		}
	}

	/* If we didn't parse any digits, we have an invalid number. */
	if (start === idx) {
		return (new Error('invalid number: ' + JSON.stringify(str)));
	}

	/* Trim any whitespace on the right side. */
	if (options.trimWhitespace) {
		while (idx < len && isSpace(str.charCodeAt(idx))) {
			++idx;
		}
	}

	/* Check for trailing characters. */
	if (idx < len && !options.allowTrailing) {
		return (new Error('trailing characters after number: ' +
		    JSON.stringify(str.slice(idx))));
	}

	/* If our value is 0, we return now, to avoid returning -0. */
	if (value === 0) {
		return (0);
	}

	/* Calculate our final value. */
	var result = value * mult;

	/*
	 * If the string represents a value that cannot be precisely represented
	 * by JavaScript, then we want to check that:
	 *
	 * - We never increased the value past MAX_SAFE_INTEGER
	 * - We don't make the result negative and below MIN_SAFE_INTEGER
	 *
	 * Because we only ever increment the value during parsing, there's no
	 * chance of moving past MAX_SAFE_INTEGER and then dropping below it
	 * again, losing precision in the process. This means that we only need
	 * to do our checks here, at the end.
	 */
	if (!options.allowImprecise &&
	    (value > MAX_SAFE_INTEGER || result < MIN_SAFE_INTEGER)) {
		return (new Error('number is outside of the supported range: ' +
		    JSON.stringify(str.slice(start, idx))));
	}

	return (result);
}