function inheritsComments(child, parent) {
	  inheritTrailingComments(child, parent);
	  inheritLeadingComments(child, parent);
	  inheritInnerComments(child, parent);
	  return child;
	}