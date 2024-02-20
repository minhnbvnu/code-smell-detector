function findTagCodeInMap3(dictKeys, dictValues, key) {
	let i
	if (typeof key === 'number') {
		for (i = 0; i < dictKeys.length; i++) {
			if (dictKeys[i] === key) return true
		}
	} else {
		for (i = 0; i < dictValues.length; i++) {
			if (dictValues[i] === key) return true
		}
	}
	return false
}