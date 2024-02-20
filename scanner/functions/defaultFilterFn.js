function defaultFilterFn(input, child) {
	  return String(getPropValue(child, this.props.optionFilterProp)).indexOf(input) > -1;
	}