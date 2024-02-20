function button(text, className, func){
	var button=document.createElement('button');
	button.innerHTML=text;
	if(typeof className === 'string')
		button.className=className;
	button.addEventListener('click', func, false);
	return button
}