function clearChildElms () {
				for (var n=prevParents.length; n--;) {
					prevParents[n].childElms = null;
				}
			}