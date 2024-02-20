function hashToInt(hash, maximum) {
		let finalInt = 0
		const result = []

		// Splitting evenly the string
		for (let i = 0; i < hash.length; i++) {
			// chars in md5 goes up to f, hex:16
			result.push(parseInt(hash.charAt(i), 16) % 16)
		}

		// Adds up all results
		for (const j in result) {
			finalInt += result[j]
		}

		// chars in md5 goes up to f, hex:16
		// make sure we're always using int in our operation
		return parseInt(parseInt(finalInt, 10) % maximum, 10)
	}