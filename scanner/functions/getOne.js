function getOne(id) {
		var deferred = $q.defer();
		deferred.resolve(items[id]);

		return deferred.promise;
	}