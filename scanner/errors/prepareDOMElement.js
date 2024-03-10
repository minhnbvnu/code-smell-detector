function prepareDOMElement(prepSettings) {
	    var mode = prepSettings.mode;
	    var el = prepSettings.el;
	    var flags = prepSettings.flags;
	    var _engineSettings = prepSettings.engineSettings;
	    var dimensions = flags.dimensions,
	        theme = flags.theme;
	    var dimensionsCaption = dimensions.width + 'x' + dimensions.height;
	    mode = mode == null ? (flags.fluid ? 'fluid' : 'image') : mode;
	    var holderTemplateRe = /holder_([a-z]+)/g;
	    var dimensionsInText = false;

	    if (flags.text != null) {
	        theme.text = flags.text;

	        //<object> SVG embedding doesn't parse Unicode properly
	        if (el.nodeName.toLowerCase() === 'object') {
	            var textLines = theme.text.split('\\n');
	            for (var k = 0; k < textLines.length; k++) {
	                textLines[k] = utils.encodeHtmlEntity(textLines[k]);
	            }
	            theme.text = textLines.join('\\n');
	        }
	    }

	    if (theme.text) {
	        var holderTemplateMatches = theme.text.match(holderTemplateRe);

	        if (holderTemplateMatches !== null) {
	            //todo: optimize template replacement
	            holderTemplateMatches.forEach(function (match) {
	                if (match === 'holder_dimensions') {
	                    theme.text = theme.text.replace(match, dimensionsCaption);
	                }
	            });
	        }
	    }

	    var holderURL = flags.holderURL;
	    var engineSettings = extend(_engineSettings, null);

	    if (flags.font) {
	        /*
	        If external fonts are used in a <img> placeholder rendered with SVG, Holder falls back to canvas.

	        This is done because Firefox and Chrome disallow embedded SVGs from referencing external assets.
	        The workaround is either to change the placeholder tag from <img> to <object> or to use the canvas renderer.
	        */
	        theme.font = flags.font;
	        if (!engineSettings.noFontFallback && el.nodeName.toLowerCase() === 'img' && App.setup.supportsCanvas && engineSettings.renderer === 'svg') {
	            engineSettings = extend(engineSettings, {
	                renderer: 'canvas'
	            });
	        }
	    }

	    //Chrome and Opera require a quick 10ms re-render if web fonts are used with canvas
	    if (flags.font && engineSettings.renderer == 'canvas') {
	        engineSettings.reRender = true;
	    }

	    if (mode == 'background') {
	        if (el.getAttribute('data-background-src') == null) {
	            DOM.setAttr(el, {
	                'data-background-src': holderURL
	            });
	        }
	    } else {
	        var domProps = {};
	        domProps[App.vars.dataAttr] = holderURL;
	        DOM.setAttr(el, domProps);
	    }

	    flags.theme = theme;

	    //todo consider using all renderSettings in holderData
	    el.holderData = {
	        flags: flags,
	        engineSettings: engineSettings
	    };

	    if (mode == 'image' || mode == 'fluid') {
	        DOM.setAttr(el, {
	            'alt': theme.text ? (dimensionsInText ? theme.text : theme.text + ' [' + dimensionsCaption + ']') : dimensionsCaption
	        });
	    }

	    var renderSettings = {
	        mode: mode,
	        el: el,
	        holderSettings: {
	            dimensions: dimensions,
	            theme: theme,
	            flags: flags
	        },
	        engineSettings: engineSettings
	    };

	    if (mode == 'image') {
	        if (!flags.auto) {
	            el.style.width = dimensions.width + 'px';
	            el.style.height = dimensions.height + 'px';
	        }

	        if (engineSettings.renderer == 'html') {
	            el.style.backgroundColor = theme.bg;
	        } else {
	            render(renderSettings);

	            if (flags.textmode == 'exact') {
	                el.holderData.resizeUpdate = true;
	                App.vars.resizableImages.push(el);
	                updateResizableElements(el);
	            }
	        }
	    } else if (mode == 'background' && engineSettings.renderer != 'html') {
	        render(renderSettings);
	    } else if (mode == 'fluid') {
	        el.holderData.resizeUpdate = true;

	        if (dimensions.height.slice(-1) == '%') {
	            el.style.height = dimensions.height;
	        } else if (flags.auto == null || !flags.auto) {
	            el.style.height = dimensions.height + 'px';
	        }
	        if (dimensions.width.slice(-1) == '%') {
	            el.style.width = dimensions.width;
	        } else if (flags.auto == null || !flags.auto) {
	            el.style.width = dimensions.width + 'px';
	        }
	        if (el.style.display == 'inline' || el.style.display === '' || el.style.display == 'none') {
	            el.style.display = 'block';
	        }

	        setInitialDimensions(el);

	        if (engineSettings.renderer == 'html') {
	            el.style.backgroundColor = theme.bg;
	        } else {
	            App.vars.resizableImages.push(el);
	            updateResizableElements(el);
	        }
	    }
	}