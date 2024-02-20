function setObjClose()
{
	if(isIe)
	{
			curSObj.filters.alpha.opacity-=intAlphaStep;
			if (curSObj.filters.alpha.opacity>0)
				{
				 setTimeout('setObjClose()',intTimeStep);
				}
			else
		 {
	curSObj.style.display="none";
	}
	}
	else
	{
			 curOpacity-=intAlphaStep;
			 if (curOpacity>0)
			{
						curSObj.style.opacity =curOpacity;
						setTimeout('setObjClose()',intTimeStep);
			}
			 else
			{
				curSObj.style.display='none';
				 }
	 }
}