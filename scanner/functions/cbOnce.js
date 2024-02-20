function cbOnce () {
			if (!loaded) {
				loaded = true;
				cb();
			}
		}