function createCharacterList(inlineStyles, entities) {
	  var characterArray = inlineStyles.map(function (style, ii) {
	    var entity = entities[ii];
	    return CharacterMetadata.create({ style: style, entity: entity });
	  });
	  return List(characterArray);
	}