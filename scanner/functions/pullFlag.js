function pullFlag(node, flag) {
	  var flags = node.flags.split("");
	  if (node.flags.indexOf(flag) < 0) return;
	  (0, _pull2.default)(flags, flag);
	  node.flags = flags.join("");
	}