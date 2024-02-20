function inputFloat(id,min,max,def){
	var input=document.createElement('input');
	input.id='float-'+id;
	input.className='full-width text-right';
	input.type='text';
	input.minValue=min;
	input.maxValue=max;
	input.value=def;
	input.addEventListener('change', fixNumericFieldValueFromEvent, false);
	return input
}