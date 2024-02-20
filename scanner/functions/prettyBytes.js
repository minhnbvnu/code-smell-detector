function prettyBytes(number, options) {
	if (number == null) return ''
	if (!Number.isFinite(number)) {
		number = parseInt(number)
		if (!Number.isFinite(number)) {
			return '';
		}
	}

	options = {
		bits: false,
		binary: true,
		...options,
	};

	const UNITS = options.bits
		? (options.binary ? BIBIT_UNITS : BIT_UNITS)
		: (options.binary ? BIBYTE_UNITS : BYTE_UNITS);

	if (options.signed && number === 0) {
		return ` 0 ${UNITS[0]}`;
	}

	const isNegative = number < 0;
	const prefix = isNegative ? '-' : (options.signed ? '+' : '');

	if (isNegative) {
		number = -number;
	}

	let localeOptions;

	if (options.minimumFractionDigits !== undefined) {
		localeOptions = { minimumFractionDigits: options.minimumFractionDigits };
	}

	if (options.maximumFractionDigits !== undefined) {
		localeOptions = { maximumFractionDigits: options.maximumFractionDigits, ...localeOptions };
	}

	if (number < 1) {
		const numberString = toLocaleString(number, options.locale, localeOptions);
		return prefix + numberString + ' ' + UNITS[0];
	}

	const exponent = Math.min(Math.floor(options.binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3), UNITS.length - 1);
	number /= (options.binary ? 1024 : 1024) ** exponent;

	if (!localeOptions) {
		number = number.toPrecision(3);
	}

	const numberString = toLocaleString(Number(number), options.locale, localeOptions);

	const unit = UNITS[exponent];

	return `${prefix + numberString}${unit}`;
}