function isIllegalBareSuper(node, parent) {
	  if (!t.isSuper(node)) return false;
	  if (t.isMemberExpression(parent, { computed: false })) return false;
	  if (t.isCallExpression(parent, { callee: node })) return false;
	  return true;
	}