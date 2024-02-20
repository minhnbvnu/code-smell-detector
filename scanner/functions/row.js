function row(sizes){
	var r=document.createElement('div');
	r.className='row';
	for(var i=0;i<sizes.length;i++)
		r.appendChild(col(sizes[i], arguments[i+1]));
	return r
}