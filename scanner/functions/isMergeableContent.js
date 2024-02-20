function isMergeableContent(content) {
		return ((
				'string' === typeof(content) && '' !== $.trim(content)
			) || (
				content.nodeType
				&& (
					3 === content.nodeType
					&&
					'' !== $.trim(content.data)
				) || (
					1 === content.nodeType
				)
			));
	}