function deleteFirstHeaderTag(htmlString) {
		var matchFirstHeaderTag = /^<h\d+.*?>/i.exec(htmlString),
		    startHeaderTag,
		    endHeaderTag;

		if (matchFirstHeaderTag === null) {
			return htmlString;
		}

		startHeaderTag = matchFirstHeaderTag[0];
		endHeaderTag = '</' + startHeaderTag.substr(1);

		return deleteFirstMatch(
			deleteFirstMatch(htmlString, startHeaderTag),
			endHeaderTag
		);
	}