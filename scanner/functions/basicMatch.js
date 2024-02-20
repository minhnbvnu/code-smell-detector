function basicMatch(key) {
					while ((previous=previousMatch[idx++])) {
						if (notComment(previous) && match[key](previous)) {
							matchingElms[matchingElms.length] = previous;
						}
					}
					return matchingElms;
				}