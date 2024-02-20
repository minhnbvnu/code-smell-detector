function setNumericRange(f,min,max){
	var field=getField(f);
	field.className+=' text-right';
	field.minValue=min;
	field.maxValue=max;
	field.addEventListener('change', fixNumericFieldValueFromEvent, false);
	fixNumericFieldValue(field);
}