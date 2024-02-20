function lookUpwardForInlineStyle(content, fromKey) {
	  var lastNonEmpty = content.getBlockMap().reverse().skipUntil(function (_, k) {
	    return k === fromKey;
	  }).skip(1).skipUntil(function (block, _) {
	    return block.getLength();
	  }).first();

	  if (lastNonEmpty) return lastNonEmpty.getInlineStyleAt(lastNonEmpty.getLength() - 1);
	  return OrderedSet();
	}