function getLinkToConfig(key) {
	return [
		linkTo('calendar', 'index.php'),
		'v1/config',
		key,
	].join('/')
}