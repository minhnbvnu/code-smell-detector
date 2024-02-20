function getAllPropertiesData(inputNode) {
		return inputNode.nodes
			.filter((item) => isProperty(item))
			.map((item) => getNodeData(item, expectedOrder));
	}