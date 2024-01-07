function isArrayItemInputOrOutputName(key, index, value) {
	  return (key === 'inboundNodes' || key === 'outputLayers' || key === 'inputLayers') && index === 0 && typeof value === 'string';
	}