function filterFn(input, child) {
	  return String((0, _util.getPropValue)(child, (0, _util.labelCompatible)(this.props.treeNodeFilterProp))).indexOf(input) > -1;
	}