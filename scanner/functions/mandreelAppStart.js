function mandreelAppStart(startStateFunc,params)
{
	mandreelAppStartStateFunc = startStateFunc;




	if ( typeof(params.log) != 'undefined' )
		mandreelAppLog = params.log;

	if ( typeof(params.platform) != 'undefined' )
		mandreelAppPlatform = params.platform;

	if (typeof(params.mandreelJSCompressed) != 'undefined' )
		mandreelAppMandreelJsCompressed = params.mandreelJSCompressed;


/*	 The following code is removed for benchmarking:
	if ((mandreel_BrowserDetect.browser == 'Chrome' || mandreel_BrowserDetect.browser == 'Safari') && mandreel_BrowserDetect.OS == 'Mac' && mandreelAppPlatform == "flash")
		mandreelDisableSpaceKey = false; */

	if ( mandreelAppPlatform != "webgl" && mandreelAppPlatform != "flash" && mandreelAppPlatform != "nacl" && mandreelAppPlatform != "canvas" && mandreelAppPlatform != "plugin")
	{
		mandreelAppStartStateFunc("error",'platform ('+mandreelAppPlatform+') not supported');
		return;
	}

	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		mandreelAppWorkingFolder = "data/js/";
		if ( typeof(params.workingFolderWebgl) != 'undefined' )
			mandreelAppWorkingFolder = params.workingFolderWebgl;
		// Check Float64Array availability
		if ( !Mandreel_window["Float64Array"] )
		{
			mandreelAppStartStateFunc("error",'Browser unsupported: Float64Array not available');
			return;
		}

		var flashElement = Mandreel_document.getElementById('FlashWrapper');
		if ( flashElement != null )
		{
			flashElement.style.visibility = "hidden";
			flashElement.style.width = "0px";
			flashElement.style.height = "0px";
		}
		var flashElement = Mandreel_document.getElementById('FlashDiv');
		if ( flashElement != null )
		{
			flashElement.style.visibility = "hidden";
			flashElement.style.width = "0px";
			flashElement.style.height = "0px";
		}

		// Setup WebGL
		if ( typeof(params.webglCanvas) == 'undefined' )
		{
			mandreelAppStartStateFunc("error",'canvas parameter not found');
			return;
		}
		var canvas = Mandreel_document.getElementById(params.webglCanvas);
		if ( canvas == null )
		{
			mandreelAppStartStateFunc("error",'canvas object ('+params.webglCanvas+') not found');
			return;
		}
		if ( params.width != null )
		{
			canvas.width = params.width;
			mandreelAppWidthSrc = params.width;
		}
		if ( params.height != null )
		{
			canvas.height = params.height;
			mandreelAppHeightSrc = params.height;
		}
		if ( mandreelAppPlatform == "webgl" )
		{
			// The following code is removed for benchmarking:
			// imandreel_gl = WebGLUtils.setupWebGL(canvas,{premultipliedAlpha:false,alpha:false});
			// if (imandreel_gl == null)
			// {
			//	mandreelAppStartStateFunc("error","webgl_not_found");
			//	return;
			// }
		}

		if ( mandreelAppPlatform == "canvas" )
		{
			imandreel_ctx_canvas = canvas.getContext('2d');
			if ( imandreel_ctx_canvas == null )
			{
				mandreelAppStartStateFunc("error","canvas context 2d not found");
				return;
			}
		}

		if (params.cache != null)
		{
			//alert( params.cache.size + params.cache.url);
			mandreel_fs_init(function() { if ( mandreelAppStartStateFunc )
				mandreelAppStartStateFunc("loadingFat","");
			mandreelLoadFat();}, params.cache.size,params.cache.url);
		}
		else
		{
			// load Fat
			if ( mandreelAppStartStateFunc )
				mandreelAppStartStateFunc("loadingFat","");
			mandreelLoadFat();
		}
	}

	if ( mandreelAppPlatform == "flash" )
	{
		mandreelAppWorkingFolder = "data/as3/";
		if ( typeof(params.workingFolderFlash) != 'undefined' )
			mandreelAppWorkingFolder = params.workingFolderFlash;
		if (!swfobject.hasFlashPlayerVersion('11.2.0'))
		{
			mandreelAppStartStateFunc("error","flash 11 not found");
			return;
		}

		if ( typeof(params.flashCanvas) == 'undefined' )
		{
			mandreelAppStartStateFunc("error",'canvas parameter not found');
			return;
		}

		if ( true ) // hide webgl canvas
		{
			var canvas = Mandreel_document.getElementById(mandreelAppCanvasDiv);
			if ( canvas != null )
			{
				canvas.style.visibility = "hidden";
				canvas.style.width = "0px";
				canvas.style.height = "0px";
			}
		}

		if ( params.width != null )
		{
			mandreelAppCanvasWidth = params.width;
		}
		if ( params.height != null )
		{
			mandreelAppCanvasHeight = params.height;
		}

		mandreelAppCanvasDiv = params.flashCanvas;

		try
		{
			var mandreelSocketsSwf = "mandreel.swf";
			if ( typeof(params.swfFlash) != 'undefined' )
				mandreelSocketsSwf = params.swfFlash;

			var my_flashvars = "workingFolder=" + encodeURIComponent(mandreelAppWorkingFolder);
			if ( typeof(params.log) != 'undefined' && params.log == true)
			  my_flashvars += "&log=true"
			my_flashvars += "&width=" + params.width;
			my_flashvars += "&height=" + params.height;
			my_flashvars += "&swfloader=" + mandreelSocketsSwf;

			if (typeof(params.restore_context) != 'undefined' && params.restore_context == true)
				my_flashvars += "&restore_context=1";

			if (typeof(params.antialiasing) != 'undefined')
				my_flashvars += "&antialiasing=" + params.antialiasing;

			if (typeof(params.right_click_enable) != 'undefined' && params.right_click_enable == true)
				my_flashvars += "&right_click=1";

			if (typeof(params.disable_depth) != 'undefined' && params.disable_depth == true)
				my_flashvars += "&disable_depth=1";

			var swfname = "mandreelloader.swf";
			if ( typeof(params.swfPreloader) != 'undefined' && params.swfPreloader == false)
				swfname = mandreelSocketsSwf;

			var swf = swfobject.createSWF({ data:swfname, width:"100%", height:"100%" }, { menu:"false",allowScriptAccess:"always",allowFullScreen:"true",wmode:"direct",scale:"noscale",salign :"tl",bgcolor:"#000000",flashvars:my_flashvars}, params.flashCanvas);
			if ( !swf )
			{
				mandreelAppStartStateFunc("error","error loading " + swfname);
				return;
			}
			else
			{
				if ( mandreelAppStartStateFunc )
					mandreelAppStartStateFunc("loadingScript","");
			}
		}
		catch(err)
		{
			mandreelAppStartStateFunc("error","exception " + err + " while loading " + mandreelSocketsSwf);
			return;
		}

		appStartState('loadingScript');
	}

	if ( mandreelAppPlatform == "nacl" )
	{
		mandreelAppWorkingFolder = "data/nacl/";

		// load Fat
		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingFat","");
		mandreelLoadFat();

	}

	if ( mandreelAppPlatform == "plugin" )
	{
		mandreelInitPluginPlatform(params);
	}
}