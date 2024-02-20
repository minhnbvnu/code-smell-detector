function proximity(s1, s2) {
	const c1 = rgb2lab(get.rgb(s1))
	const c2 = rgb2lab(get.rgb(s2))
	return Math.sqrt(
		Math.pow(c1[0] - c2[0], 2)
		+ Math.pow(c1[1] - c2[1], 2)
		+ Math.pow(c1[2] - c2[2], 2)
	)
}