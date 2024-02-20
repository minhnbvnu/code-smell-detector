function rebuildlayers() {
				var newlayers = [];
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].length === 0)
						continue;
					newlayers.push(layers[i]);
				}
				layers = newlayers;
			}