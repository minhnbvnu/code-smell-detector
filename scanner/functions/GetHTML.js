function GetHTML(configStore) {
	    return function exportHtml(editorState) {
	        var contentState = editorState.getCurrentContent();
	        var blockMap = contentState.getBlockMap();
	        var customStyleMap = configStore.get('customStyleMap') || {};
	        var customBlockRenderMap = configStore.get('blockRenderMap') || {};
	        var customStyleFn = configStore.get('customStyleFn');
	        var toHTMLList = configStore.get('toHTMLList');
	        _extends(customStyleMap, DEFAULT_INLINE_STYLE);
	        return blockMap.map(function (block) {
	            var resultText = '<div>';
	            var closeTag = '</div>';
	            var lastPosition = 0;
	            var text = block.getText();
	            var blockType = block.getType();
	            var blockRender = customBlockRenderMap.get(blockType);
	            if (blockRender) {
	                var element = typeof blockRender.element === 'function' ? blockRender.elementTag || 'div' : 'div';
	                resultText = '<' + (element || 'div') + ' style="' + getStyleText(customBlockRenderMap.get(blockType).style || {}) + '">';
	                closeTag = '</' + (element || 'div') + '>';
	            }
	            var charMetaList = block.getCharacterList();
	            var charEntity = null;
	            var prevCharEntity = null;
	            var ranges = [];
	            var rangeStart = 0;
	            for (var i = 0, len = text.length; i < len; i++) {
	                prevCharEntity = charEntity;
	                var meta = charMetaList.get(i);
	                charEntity = meta ? meta.getEntity() : null;
	                if (i > 0 && charEntity !== prevCharEntity) {
	                    ranges.push([prevCharEntity, getStyleRanges(text.slice(rangeStart, i), charMetaList.slice(rangeStart, i))]);
	                    rangeStart = i;
	                }
	            }
	            ranges.push([charEntity, getStyleRanges(text.slice(rangeStart), charMetaList.slice(rangeStart))]);
	            ranges.map(function (_ref) {
	                var _ref2 = _slicedToArray(_ref, 2),
	                    entityKey = _ref2[0],
	                    stylePieces = _ref2[1];

	                var element = DEFAULT_ELEMENT;
	                var rawContent = stylePieces.map(function (_ref3) {
	                    var _ref4 = _slicedToArray(_ref3, 1),
	                        text = _ref4[0];

	                    return text;
	                }).join('');
	                var content = stylePieces.map(function (_ref5) {
	                    var _ref6 = _slicedToArray(_ref5, 2),
	                        text = _ref6[0],
	                        styleSet = _ref6[1];

	                    var encodedContent = encodeContent(text);
	                    if (styleSet.size) {
	                        var inlineStyle = {};
	                        styleSet.forEach(function (item) {
	                            if (customStyleMap.hasOwnProperty(item)) {
	                                var currentStyle = customStyleMap[item];
	                                inlineStyle = _extends(inlineStyle, currentStyle);
	                            }
	                        });
	                        var customedStyle = customStyleFn(styleSet);
	                        inlineStyle = _extends(inlineStyle, customedStyle);
	                        return '<span style="' + getStyleText(inlineStyle) + '">' + encodedContent + '</span>';
	                    }
	                    return '<span>' + encodedContent + '</span>';
	                }).join('');
	                if (entityKey) {
	                    var entity = contentState.getEntity(entityKey);
	                    var entityData = entity.getData();
	                    if (entityData && entityData["export"]) {
	                        resultText += entityData["export"](content, entityData);
	                    } else {
	                        var HTMLText = '';
	                        toHTMLList.forEach(function (toHTML) {
	                            var text = toHTML(rawContent, entity, contentState);
	                            if (text) {
	                                HTMLText = text;
	                            }
	                        });
	                        if (HTMLText) {
	                            resultText += HTMLText;
	                        }
	                    }
	                } else {
	                    resultText += content;
	                }
	            });
	            resultText += closeTag;
	            return resultText;
	        }).join('\n');
	    };
	}