function whereFunction(collection) {
	return !whereIndex ? collection.models : collection.where({
		done : whereIndex === 1 ? 0 : 1
	});
}