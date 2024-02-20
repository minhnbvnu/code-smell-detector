function addCssLink(cssHref) {
		var cssNode = document.createElement('link');
		var windowWidth;
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.media = 'screen, handheld, fallback';
		cssNode.href = cssHref;
		document.getElementsByTagName("head")[0].appendChild(cssNode);
	}