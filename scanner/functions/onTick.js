function onTick()
{
	update();	
	setTimeout(onTick, 200);
}