function replicationError(db, name) {
		return new Promise (resolve => {
			const check = (doc) => {
				if (doc._replication_state === 'error') {
					resolve(doc);
					return true;
				}

				return async();
			};
			const async = () => db.get(name).then(check);

			async();
		});
	}