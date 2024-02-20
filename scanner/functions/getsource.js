function getsource() {
				var thesource = null;
				var first = false;
				for (var source in sources) {
					if (first)
						return;
					first = true;
					thesource = sources[source];
				}
				return thesource;
			}