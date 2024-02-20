function typeInAnimation(element,timeout,what,onFinish)
{
	if(!what) { onFinish(); return; }
	element.innerHTML+=what[0];
	window.setTimeout(	function(){typeInAnimation(element,timeout,what.substring(1),onFinish);}, timeout );
}