function to_trusted($sce) {
	return function (text) {
		let value = ''
		if (angular.isString(text)) {
			value = text.replace(/<script[\s\S]*?<\/script>/ig, '')
		}
	    return $sce.trustAsHtml(value)
	}
}