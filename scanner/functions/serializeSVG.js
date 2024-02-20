function serializeSVG(svg, renderSettings) {
		if (!global.XMLSerializer) return;
		var serializer = new XMLSerializer();
		var svgCSS = '';
		var stylesheets = renderSettings.stylesheets;
		var defs = svg.querySelector('defs');

		//External stylesheets: Processing Instruction method
		if (renderSettings.svgXMLStylesheet) {
			var xml = new DOMParser().parseFromString('<xml />', 'application/xml');
			//Add <?xml-stylesheet ?> directives
			for (var i = stylesheets.length - 1; i >= 0; i--) {
				var csspi = xml.createProcessingInstruction('xml-stylesheet', 'href="' + stylesheets[i] + '" rel="stylesheet"');
				xml.insertBefore(csspi, xml.firstChild);
			}

			//Add <?xml ... ?> UTF-8 directive
			var xmlpi = xml.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8" standalone="yes"');
			xml.insertBefore(xmlpi, xml.firstChild);
			xml.removeChild(xml.documentElement);
			svgCSS = serializer.serializeToString(xml);
		}

		/*

		//External stylesheets: <link> method
		if (renderSettings.svgLinkStylesheet) {

			defs.removeChild(defs.firstChild);
			for (i = 0; i < stylesheets.length; i++) {
				var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'link');
				link.setAttribute('href', stylesheets[i]);
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('type', 'text/css');
				defs.appendChild(link);
			}
		}

		//External stylesheets: <style> and @import method
		if (renderSettings.svgImportStylesheet) {
			var style = document.createElementNS(SVG_NS, 'style');
			var styleText = [];

			for (i = 0; i < stylesheets.length; i++) {
				styleText.push('@import url(' + stylesheets[i] + ');');
			}

			var styleTextNode = document.createTextNode(styleText.join('\n'));
			style.appendChild(styleTextNode);
			defs.appendChild(style);
		}

		*/

		var svgText = serializer.serializeToString(svg);
		svgText = svgText.replace(/\&amp;(\#[0-9]{2,}\;)/g, '&$1');
		return svgCSS + svgText;
	}