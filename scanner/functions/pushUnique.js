function pushUnique(set1, set2) {
				var i=0, s=set1, item;
				while ((item = set2[i++])) {
					if (!s.length || s.indexOf(item) < 0) {
						set1.push(item);
					}
				}
				return set1;
			}