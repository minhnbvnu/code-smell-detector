function isColorEqual(colorA, colorB) {
		return (
			(null == colorA || null == colorB)
				? colorA === colorB
				: hex(colorA) === hex(colorB)
		);
	}