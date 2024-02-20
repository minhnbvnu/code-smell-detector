function transformTitles($content) {
		$content.find('p.MsoTitle').each(function () {
			Aloha.Markup.transformDomObject($(this), 'h1');
		});
		$content.find('p.MsoSubtitle').each(function () {
			Aloha.Markup.transformDomObject($(this), 'h2');
		});
	}