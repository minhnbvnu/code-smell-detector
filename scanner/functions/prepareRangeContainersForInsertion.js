function prepareRangeContainersForInsertion ( range, table ) {
		var	eNode = range.endContainer,
			sNode = range.startContainer,
			eNodeLength = ( eNode.nodeType == 3 )
				? eNode.length
				: eNode.childNodes.length;


		if ( sNode.nodeType == 3 &&
				sNode.parentNode.tagName == 'P' &&
					sNode.parentNode.childNodes.length == 1 &&
						/^(\s|%A0)$/.test( escape( sNode.data ) ) ) {
			sNode.data = '';
			range.startOffset = 0;

			// In case ... <p> []</p>
			if ( eNode == sNode ) {
				range.endOffset = 0;
			}
		}

		// If the table is not allowed to be nested inside the startContainer,
		// then it will have to be split in order to insert the table.
		// We will therefore check if the selection touches the start and/or
		// end of their container nodes.
		// If they do, we will mark their container so that after they are
		// split we can check whether or not they should be removed
		if ( !GENTICS.Utils.Dom.allowsNesting(
				sNode.nodeType == 3 ? sNode.parentNode : sNode, table ) ) {

			if ( range.startOffset == 0 ) {
				jQuery( sNode.nodeType == 3 ? sNode.parentNode : sNode )
					.addClass( 'aloha-table-cleanme' );
			}

			if ( range.endOffset == eNodeLength ) {
				jQuery( eNode.nodeType == 3 ? eNode.parentNode : eNode )
					.addClass( 'aloha-table-cleanme' );
			}
		}
	}