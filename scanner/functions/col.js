function col(size,inner){
	var c=document.createElement('div');
	c.className='columns c'+size;
	c.appendChild(inner);
	return c
}