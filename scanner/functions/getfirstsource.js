function getfirstsource(sources) {
				var smallestid = MAX_SAFE_INTEGER;
				var thesource = null;
				for (var source_url in sources) {
					var source = sources[source_url];
					if (source.id < smallestid) {
						smallestid = source.id;
						thesource = sources[source_url];
					}
				}
				return thesource;
			}