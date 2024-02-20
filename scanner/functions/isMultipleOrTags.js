function isMultipleOrTags(props) {
	  return !!(props.multiple || props.tags || props.treeCheckable);
	}