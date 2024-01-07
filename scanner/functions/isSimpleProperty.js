function isSimpleProperty(node) {
	  return node && node.type === "Property" && node.kind === "init" && node.method === false;
	}