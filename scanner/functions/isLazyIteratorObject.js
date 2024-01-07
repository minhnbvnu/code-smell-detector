function isLazyIteratorObject(iterator) {
	  return typeof iterator.next === 'function';
	}