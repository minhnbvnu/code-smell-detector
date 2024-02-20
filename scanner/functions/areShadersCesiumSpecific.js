function areShadersCesiumSpecific(shaders) {
		for (const shaderId in shaders) {
			if (shaders[shaderId].includes('czm_')) {
				return true;
			}
		}
		return false;
	}