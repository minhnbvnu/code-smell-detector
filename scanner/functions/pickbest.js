function pickbest(layer) {
				for (var i = 0; i < layer.length; i++) {
					var source_url = layer[i];
					var source = sources[source_url];
					if (source.desc_x)
						return source;
				}
				return sources[layer[0]];
			}