function mandreel_fs_init(callback, size_bytes, url_time)
{

	g_mandreel_timestamp_fs = 99999999999999;




	var aux = null;
	try	{ aux = webkitStorageInfo; } catch(err) { aux = null; }
	if (aux == null)
	{
		//callback(false);

		var time_request = new XMLHttpRequest();
	time_request.open('GET',url_time);
	time_request.onreadystatechange = function()
	{
		if (time_request.readyState==4)
		{
			if (time_request.status==200 || time_request.status==0)
			{

				if (time_request.responseText)
				{
					g_mandreel_timestamp_fs = parseFloat(time_request.responseText);
					dump('mandreel_init_fs time ' + g_mandreel_timestamp_fs);
				}
			}

			mandreel_indexedDB.init(callback);
		}
	}
	time_request.send();


		return;
	}

	webkitStorageInfo.requestQuota(
		webkitStorageInfo.PERSISTENT ,   // or PERSISTENT
		size_bytes,
		function(bytes) {  dump('request quota succeed');},
		function () { dump('request quota failed');} );


//	g_mandreel_timestamp_fs =0;

	var time_request = new XMLHttpRequest();
	time_request.open('GET',url_time);
	time_request.onreadystatechange = function()
	{
		if (time_request.readyState==4)
		{
			if (time_request.status==200 || time_request.status==0)
			{

				if (time_request.responseText)
				{
					g_mandreel_timestamp_fs = parseFloat(time_request.responseText);
					dump('mandreel_init_fs time ' + g_mandreel_timestamp_fs);
				}
			}

			var my_requestFileSystem  = Mandreel_window.requestFileSystem || Mandreel_window.webkitRequestFileSystem;

			my_requestFileSystem(Mandreel_window.PERSISTENT, size_bytes,
				function(result)
				{
					onMandreelQuotaOk(result);


					if (callback)
						Mandreel_setTimeout(callback, 100, true);
				} , function(e) { MandreelFsErrorHandler(e); if (callback) callback(false); } );
		}
	}
	time_request.send();
}