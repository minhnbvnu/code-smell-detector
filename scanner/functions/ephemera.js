function ephemera(emap) {
		if (emap) {
			ephemeraMap = emap;
		}
		PubSub.pub('aloha.ephemera', {
			ephemera: ephemeraMap
		});
		return ephemeraMap;
	}