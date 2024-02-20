function isWithinBlock($element) {
		var i;
		var $node;
		var $parents = $element.parents();
		for (i = 0; i < $parents.length; i++) {
			$node = $parents.eq(i);
			if ($node.is('.aloha-editable')) {
				return false;
			}
			if ($node.is('.aloha-block')) {
				return true;
			}
		}
		return false;
	}