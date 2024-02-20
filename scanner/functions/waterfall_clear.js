function waterfall_clear()
{
	while(canvases.length) //delete all canvases
	{
		var x=canvases.shift();
		x.parentNode.removeChild(x);
		delete x;
	}
	add_canvas();
}