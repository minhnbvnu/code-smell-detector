function handleCycle(child, allNodes) {
		// Skip comments
		if (child.type === 'comment') {
			return {
				shouldSkip: true,
			};
		}

		// Receive node description and expectedPosition
		let nodeOrderData = getOrderData(orderInfo, child);

		let nodeData = {
			node: child,
			description: nodeOrderData.description,
			expectedPosition: nodeOrderData.expectedPosition,
		};

		allNodes.push(nodeData);

		let previousNodeData = allNodes[allNodes.length - 2]; // eslint-disable-line unicorn/prefer-at -- Need to support older Node.js

		// Skip first node
		if (!previousNodeData) {
			return {
				shouldSkip: true,
			};
		}

		return {
			isCorrectOrder: checkOrder({
				firstNodeData: previousNodeData,
				secondNodeData: nodeData,
				allNodesData: allNodes,
				isFixEnabled,
				result,
				unspecified,
			}),
			nodeData,
			previousNodeData,
		};
	}