function getBreadcrumbName(route, params) {
	    if (!route.breadcrumbName) {
	        return null;
	    }
	    var paramsKeys = Object.keys(params).join('|');
	    var name = route.breadcrumbName.replace(new RegExp(':(' + paramsKeys + ')', 'g'), function (replacement, key) {
	        return params[key] || replacement;
	    });
	    return name;
	}