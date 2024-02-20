function findTagCodeInMap2(dictKeys, dictValues, key) {
	if (typeof key === 'number')
		return dictKeys.includes(key)
	else
		return dictValues.includes(key)
}