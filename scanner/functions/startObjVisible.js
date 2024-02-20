function startObjVisible(objId)
{
	 curSObj=document.getElementById(objId);
		if(wait==0)
		{
	 setObjClose();
	 wait=2;
 }
		else
		{
			curSObj.style.display='';
			setObjOpen();
	 wait--;  
			setTimeout("startObjVisible('objDiv')",speed);
		}
}