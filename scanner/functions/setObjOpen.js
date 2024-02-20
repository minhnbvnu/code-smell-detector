function setObjOpen()
{
	if(isIe)
	{
	curSObj.filters.alpha.opacity+=intAlphaStep;
		 if (curSObj.filters.alpha.opacity<100)
	 {
			 setTimeout('setObjOpen()',intTimeStep);
	 }
	}
	else
	{ 
		 curOpacity+=intAlphaStep;
		 curSObj.style.opacity =curOpacity;
		 if (curOpacity<1) setTimeout('setObjOpen()',intTimeStep);
	}
}