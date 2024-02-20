function replicationCompletion(db, name) {
		return new Promise (resolve => {
			const check = (doc) => {
				if (doc._replication_state === 'completed') {
					resolve(doc);
					return true;
				}

				return async(resolve);
			};
			const async = () => db.get(name).then(check);

			async();
		});
	}