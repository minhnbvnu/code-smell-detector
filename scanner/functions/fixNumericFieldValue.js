function fixNumericFieldValue(field){
	var val=field.value.replace(/[^0-9\-\.]/g,'');
	if(/^float-/.test(field.id)){
		val=parseFloat(val);
	}else{
		val=parseInt(val);
	}
	

	if(isNaN(val) || val<field.minValue){
		val=field.minValue;
	}else if(val > field.maxValue){
		val=field.maxValue;
	}
	field.value=val;
}