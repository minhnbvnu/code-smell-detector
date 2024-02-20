function checkbox(id,val){
	var input=document.createElement('input');
	input.id='checkbox-'+id;
	input.type='checkbox';
	if(val)
		input.value=val;
	return input
}