function maudiotagLoadPackFile(filename,filesize,numsounds,atype)
{
	dump("audiotag packfile ("+filename+") ("+filesize+") ("+numsounds+")");
	var url = g_mandreel_working_folder+filename;
	dump("audiotag: loading packed data ("+filename+") url("+url+")");
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
	request.onreadystatechange = function()
	{
		if (request.readyState == 4)
		{
			if (request.status == 404)
				return;
			if ( request.response != null )
				audiotagParsePreloadFile(request.response,numsounds,atype);
		}
	}
	request.send();
}