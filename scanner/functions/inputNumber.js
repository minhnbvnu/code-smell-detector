function inputNumber(id,min,max,def){
	var input=document.createElement('input');
	input.id='number-'+id;
	input.className='full-width text-right';
	input.type='text'; /* type='number' validation breaks getting input value when it's not valid */
	input.minValue=min;
	input.maxValue=max;
	input.value=def;
	input.addEventListener('change', fixNumericFieldValueFromEvent, false);
	return input;
}