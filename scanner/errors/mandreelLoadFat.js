	mandreelFatPreloadRequest.onreadystatechange = function()
	{
		if (mandreelFatPreloadRequest.readyState != 4) return;
		if ( mandreelFatPreloadRequest.status != 404 && mandreelFatPreloadRequest.response != null )
		{
			mandreelFatData = mandreelFatPreloadRequest.response;
		}
		if ( mandreelFatData == "" )
		{
			dump("error loading mandreel.fat file, Maybe the working folder is not correctly set???");
		}

		var packfiledata = null;
		var compressed = false;
		var packfiledata_size = 0;
		var total_packtexture_size = 0;
		var pogsize = 0;

		// Check version
		var FatLines = mandreelFatData.split('\n');
		for ( var i=0;i<FatLines.length;++i )
		{
			var line = mandreel_removecr(FatLines[i]);
			var params = line.split(',');
			if ( params[0] == "version" )
			{
				if ( params[1] != mandrelCurrentFatVersion )
					dump("warning: mandreel.fat version number is ("+params[1]+") and it should be ("+mandrelCurrentFatVersion+")");

			}
			else if ( params[0] == "platform" && params[1] != "js" && (mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas")  )
				dump("warning: mandreel.fat platform is ("+params[1]+") and it should be (js)");
			else if ( params[0] == "platform" && params[1] != "nacl" && mandreelAppPlatform == "nacl"  )
				dump("warning: mandreel.fat platform is ("+params[1]+") and it should be (nacl)");
			else if (params[0] == 'packdata')
			{
				packfiledata = params[1];
				compressed = params[2].charAt(0) == '1';
				packfiledata_size =  parseInt(params[3], 10);
			}
			else if (params[0] == 'flashsockets')
			{
				mandreelAppUseFlashSockets = true;
			}
			else if (params[0] == 'packtexture')
			{
				var filename = params[1];
				var size_packtexture = parseInt(params[3], 10);
				total_packtexture_size+=size_packtexture;
				mandreelAppUsePackAsyncTexture.push(filename);
			}
			else if (params[0] == 'audiopreloadfile')
			{
				pogsize = parseInt(params[2],10);
			}
			else if (params[0] == 'audiodriver' && params[1] == 'webaudio')
			{
				try	{ preCreatedWebAudioContext = new webkitAudioContext(); } catch(err) { preCreatedWebAudioContext = null; }
			}
		}

		if ( preCreatedWebAudioContext != null )
			mandreel_total_pogfile_size = pogsize;
		mandreel_packfiledata_name = packfiledata;
		mandreel_packfiledata_compressed = compressed;
		mandreel_packfiledata_size = packfiledata_size;
		mandreel_total_packtexture_size = total_packtexture_size;
		mandreelFatLoaded();
	}