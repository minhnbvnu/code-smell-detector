function generateURLForToken(token = '') {
	return window.location.protocol + '//' + window.location.host + generateUrl('/call/' + token)
}