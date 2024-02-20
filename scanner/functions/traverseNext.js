function traverseNext (root, rel, arrayItem) {
		return root.then(function (response) {
			if (hasEmbeddedRel(response.entity, rel)) {
				return response.entity._embedded[rel];
			}

			if(!response.entity._links) {
				return [];
			}

			if (typeof arrayItem === 'string') {
				return api({
					method: 'GET',
					path: response.entity._links[rel].href
				});
			} else {
				return api({
					method: 'GET',
					path: response.entity._links[rel].href,
					params: arrayItem.params
				});
			}
		});
	}