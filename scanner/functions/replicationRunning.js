function replicationRunning(db, name) {
		return new Promise (resolve => {
			const check = (doc) => {
				if (doc._replication_id) {
					resolve(doc);
					return true;
				}

				return async();
			};
			const async = () => db.get(name).then(check);

			async();
		});
	}