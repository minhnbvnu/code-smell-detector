function insertFragment(editorState, fragment, entityMap) {
	  var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);
	  // TODO: merge the entity map once we stop using DraftEntity
	  // like this:
	  // const mergedEntityMap = newContent.getEntityMap().merge(entityMap);

	  return EditorState.push(editorState, newContent.set('entityMap', entityMap), 'insert-fragment');
	}