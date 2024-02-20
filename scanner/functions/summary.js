function summary(colorF, specs, failed) {
		print(colorF(specs + ' ' + plural(language.spec, specs) + ', ' +
		failed + ' ' + plural(language.failure, failed)));
	}