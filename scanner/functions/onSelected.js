function onSelected(obj)
{
	document.getElementById('propname').innerHTML = 'Application.' + commands[obj.value];
	document.getElementById('help').innerHTML = descriptions[obj.value];
	currentSelection = obj.value;
	isCurrentEnabled();
}