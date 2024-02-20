function walkWidgetDependencies(id) {
		var collection = collections[id];

		if (!collection) {
			collection = findWidgetAsNodeModule(id);

			if (!collection) {
				notFound.push(id);
				return;
			}
		}

		dirs.push(collection);
		for (var dependency in collection.manifest.dependencies) {
			walkWidgetDependencies(dependency);
		}
	}