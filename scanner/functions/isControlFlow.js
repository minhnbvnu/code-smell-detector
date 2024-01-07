function isControlFlow(node) {
	  return CONTROL_FLOW_OPS.indexOf(node.op) >= 0;
	}