function customHTML2Content(HTML, contentState) {
	    var tempDoc = new DOMParser().parseFromString(HTML, 'text/html');
	    // replace all <img /> with <blockquote /> elements
	    (0, _toArray2["default"])(tempDoc.querySelectorAll('img')).forEach(imgReplacer);
	    // use DraftJS converter to do initial conversion. I don't provide DOMBuilder and
	    // blockRenderMap arguments here since it should fall back to its default ones, which are fine

	    var _convertFromHTML = (0, _draftJs.convertFromHTML)(tempDoc.body.innerHTML),
	        contentBlocks = _convertFromHTML.contentBlocks;
	    // now replace <blockquote /> ContentBlocks with 'atomic' ones


	    contentBlocks = contentBlocks.reduce(function (contentBlocks, block) {
	        if (block.getType() !== 'blockquote') {
	            return contentBlocks.concat(block);
	        }
	        var image = JSON.parse(block.getText());
	        contentState.createEntity('IMAGE-ENTITY', 'IMMUTABLE', image);
	        var entityKey = contentState.getLastCreatedEntityKey();
	        var charData = _draftJs.CharacterMetadata.create({ entity: entityKey });
	        // const blockSpec = Object.assign({ type: 'atomic', text: ' ' }, { entityData })
	        // const atomicBlock = createContentBlock(blockSpec)
	        // const spacerBlock = createContentBlock({});
	        var fragmentArray = [new _draftJs.ContentBlock({
	            key: (0, _draftJs.genKey)(),
	            type: 'image-block',
	            text: ' ',
	            characterList: (0, _immutable.List)((0, _immutable.Repeat)(charData, charData.count()))
	        }), new _draftJs.ContentBlock({
	            key: (0, _draftJs.genKey)(),
	            type: 'unstyled',
	            text: '',
	            characterList: (0, _immutable.List)()
	        })];
	        return contentBlocks.concat(fragmentArray);
	    }, []);
	    // console.log('>> customHTML2Content contentBlocks', contentBlocks);
	    tempDoc = null;
	    return _draftJs.BlockMapBuilder.createFromArray(contentBlocks);
	}