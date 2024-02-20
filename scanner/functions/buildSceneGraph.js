function buildSceneGraph(scene) {
	    var fontSize = App.defaults.size;
	    if (parseFloat(scene.theme.size)) {
	        fontSize = scene.theme.size;
	    } else if (parseFloat(scene.flags.size)) {
	        fontSize = scene.flags.size;
	    }

	    scene.font = {
	        family: scene.theme.font ? scene.theme.font : 'Arial, Helvetica, Open Sans, sans-serif',
	        size: textSize(scene.width, scene.height, fontSize, App.defaults.scale),
	        units: scene.theme.units ? scene.theme.units : App.defaults.units,
	        weight: scene.theme.fontweight ? scene.theme.fontweight : 'bold'
	    };

	    scene.text = scene.theme.text || Math.floor(scene.width) + 'x' + Math.floor(scene.height);

	    scene.noWrap = scene.theme.nowrap || scene.flags.nowrap;

	    scene.align = scene.theme.align || scene.flags.align || 'center';

	    switch (scene.flags.textmode) {
	        case 'literal':
	            scene.text = scene.flags.dimensions.width + 'x' + scene.flags.dimensions.height;
	            break;
	        case 'exact':
	            if (!scene.flags.exactDimensions) break;
	            scene.text = Math.floor(scene.flags.exactDimensions.width) + 'x' + Math.floor(scene.flags.exactDimensions.height);
	            break;
	    }

	    var lineWrap = scene.flags.lineWrap || App.setup.lineWrapRatio;
	    var sceneMargin = scene.width * lineWrap;
	    var maxLineWidth = sceneMargin;

	    var sceneGraph = new SceneGraph({
	        width: scene.width,
	        height: scene.height
	    });

	    var Shape = sceneGraph.Shape;

	    var holderBg = new Shape.Rect('holderBg', {
	        fill: scene.theme.bg
	    });

	    holderBg.resize(scene.width, scene.height);
	    sceneGraph.root.add(holderBg);

	    if (scene.flags.outline) {
	        var outlineColor = new Color(holderBg.properties.fill);
	        outlineColor = outlineColor.lighten(outlineColor.lighterThan('7f7f7f') ? -0.1 : 0.1);
	        holderBg.properties.outline = {
	            fill: outlineColor.toHex(true),
	            width: 2
	        };
	    }

	    var holderTextColor = scene.theme.fg;

	    if (scene.flags.autoFg) {
	        var holderBgColor = new Color(holderBg.properties.fill);
	        var lightColor = new Color('fff');
	        var darkColor = new Color('000', {
	            'alpha': 0.285714
	        });

	        holderTextColor = holderBgColor.blendAlpha(holderBgColor.lighterThan('7f7f7f') ? darkColor : lightColor).toHex(true);
	    }

	    var holderTextGroup = new Shape.Group('holderTextGroup', {
	        text: scene.text,
	        align: scene.align,
	        font: scene.font,
	        fill: holderTextColor
	    });

	    holderTextGroup.moveTo(null, null, 1);
	    sceneGraph.root.add(holderTextGroup);

	    var tpdata = holderTextGroup.textPositionData = stagingRenderer(sceneGraph);
	    if (!tpdata) {
	        throw 'Holder: staging fallback not supported yet.';
	    }
	    holderTextGroup.properties.leading = tpdata.boundingBox.height;

	    var textNode = null;
	    var line = null;

	    function finalizeLine(parent, line, width, height) {
	        line.width = width;
	        line.height = height;
	        parent.width = Math.max(parent.width, line.width);
	        parent.height += line.height;
	    }

	    if (tpdata.lineCount > 1) {
	        var offsetX = 0;
	        var offsetY = 0;
	        var lineIndex = 0;
	        var lineKey;
	        line = new Shape.Group('line' + lineIndex);

	        //Double margin so that left/right-aligned next is not flush with edge of image
	        if (scene.align === 'left' || scene.align === 'right') {
	            maxLineWidth = scene.width * (1 - (1 - lineWrap) * 2);
	        }

	        for (var i = 0; i < tpdata.words.length; i++) {
	            var word = tpdata.words[i];
	            textNode = new Shape.Text(word.text);
	            var newline = word.text == '\\n';
	            if (!scene.noWrap && (offsetX + word.width >= maxLineWidth || newline === true)) {
	                finalizeLine(holderTextGroup, line, offsetX, holderTextGroup.properties.leading);
	                holderTextGroup.add(line);
	                offsetX = 0;
	                offsetY += holderTextGroup.properties.leading;
	                lineIndex += 1;
	                line = new Shape.Group('line' + lineIndex);
	                line.y = offsetY;
	            }
	            if (newline === true) {
	                continue;
	            }
	            textNode.moveTo(offsetX, 0);
	            offsetX += tpdata.spaceWidth + word.width;
	            line.add(textNode);
	        }

	        finalizeLine(holderTextGroup, line, offsetX, holderTextGroup.properties.leading);
	        holderTextGroup.add(line);

	        if (scene.align === 'left') {
	            holderTextGroup.moveTo(scene.width - sceneMargin, null, null);
	        } else if (scene.align === 'right') {
	            for (lineKey in holderTextGroup.children) {
	                line = holderTextGroup.children[lineKey];
	                line.moveTo(scene.width - line.width, null, null);
	            }

	            holderTextGroup.moveTo(0 - (scene.width - sceneMargin), null, null);
	        } else {
	            for (lineKey in holderTextGroup.children) {
	                line = holderTextGroup.children[lineKey];
	                line.moveTo((holderTextGroup.width - line.width) / 2, null, null);
	            }

	            holderTextGroup.moveTo((scene.width - holderTextGroup.width) / 2, null, null);
	        }

	        holderTextGroup.moveTo(null, (scene.height - holderTextGroup.height) / 2, null);

	        //If the text exceeds vertical space, move it down so the first line is visible
	        if ((scene.height - holderTextGroup.height) / 2 < 0) {
	            holderTextGroup.moveTo(null, 0, null);
	        }
	    } else {
	        textNode = new Shape.Text(scene.text);
	        line = new Shape.Group('line0');
	        line.add(textNode);
	        holderTextGroup.add(line);

	        if (scene.align === 'left') {
	            holderTextGroup.moveTo(scene.width - sceneMargin, null, null);
	        } else if (scene.align === 'right') {
	            holderTextGroup.moveTo(0 - (scene.width - sceneMargin), null, null);
	        } else {
	            holderTextGroup.moveTo((scene.width - tpdata.boundingBox.width) / 2, null, null);
	        }

	        holderTextGroup.moveTo(null, (scene.height - tpdata.boundingBox.height) / 2, null);
	    }

	    //todo: renderlist
	    return sceneGraph;
	}