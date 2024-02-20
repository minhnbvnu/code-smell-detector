function _fs(fieldId) {
	var field = (fieldId) ? cIPJQ("input[data-cip-id='"+fieldId+"']:first,select[data-cip-id='"+fieldId+"']:first").first() : [];
	return (field.length > 0) ? field : null;
}