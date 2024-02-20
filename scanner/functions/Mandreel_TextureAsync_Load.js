function Mandreel_TextureAsync_Load(sp)
{
	var ptr_name = heap32[sp>>2];sp+=4;
	var texture_id = heap32[sp>>2];sp+=4;

	var name = get_string_from_ptr(ptr_name);

	var nameSrc = name;

	name = name.toLowerCase();


	var full_name	= g_mandreel_working_folder + name;

	var image  = new Image();


	Mandreel_TextureAsync_textures++;

	var imgURL = null;




	image.onerror = function() {
          dump('error loading texture ' + image.src + '\n');
		  Mandreel_TextureAsync_textures_loaded++;
      }
	image.onload = function()
	{
		if (imgURL)
		{
			var URL = Mandreel_window.URL || Mandreel_window.webkitURL;
			URL.revokeObjectURL(imgURL);
		}
		if ( mandreelAppPlatform == "canvas" )
		{
			array_ids_ogl[texture_id] = image;
			Mandreel_TextureAsync_textures_loaded++;
		}
		else
		{
			var tex = array_ids_ogl[texture_id];
			if (tex)
			{
				tex.image = image;
				tex.mandreel_width = image.width;
				tex.mandreel_height = image.height;
				Mandreel_TextureAsync_textures_loaded++;

				var sp = MandreelLockFrame();
				MandreelInterCallFunction('void',"Mandreel_TextureAsync_Loaded",'int',texture_id,'int',image.width,'int',image.height, sp);
				MandreelUnlockFrame();
		}
			else
			{
				dump('texture not valid ' + texture_id + ' ' + name + '\n');
				Mandreel_TextureAsync_textures_loaded++;
			}
		}


	}

	var new_sp = sp-4096;

	var packfile = new_sp + 2048;
	var offset_ptr = new_sp + 2048+1024;
	var size_ptr = new_sp + 2048+1024+4;

	fill_ptr_from_string(new_sp + 1024,name);

	heap32[(new_sp)>>2] = new_sp + 1024;
	heap32[(new_sp+4)>>2] = offset_ptr;
	heap32[(new_sp+8)>>2] = size_ptr;
	heap32[(new_sp+12)>>2] = packfile;
	iMandreel_TextureAsync_GetPackOffset(new_sp);


	var image_src;

	var image_src_valid = true;

	if (r_g0)
	{
		var packfilename = get_string_from_ptr(packfile);
		image_src = mandreel_arrayBufferDataUri(heap32[offset_ptr>>2],heap32[size_ptr>>2],Mandreel_TextureAsync_PackBufferData[packfilename]);
	}
	else
	{

		if (nameSrc.search('http:') != -1 || nameSrc.search('https:') != -1)
		{
			image.crossOrigin = 'anonymous'; // no credentials flag. Same as
			image_src = nameSrc;
		}
		else
		{
			if (mandreel_is_filesystem())
			{
				image_src_valid = false;

				var new_name = mandreel_texture_async_fix_name(full_name);
				mandreel_fs_get_url(new_name, function Mandreel_TextureAsync_Load_FS(data) {
					if (data)
					{
						image.src = data;
					}
					else
					{
						var packdata_request = new XMLHttpRequest();

						packdata_request.open("GET", full_name, true);

						if("responseType" in packdata_request)
							packdata_request.responseType="arraybuffer";
						else
							packdata_request.overrideMimeType('text/plain; charset=x-user-defined');

						packdata_request.onreadystatechange = function()
						{
							if (packdata_request.readyState != 4) return;

							if (packdata_request.status == 200)
							{
								var buffer;
								if (packdata_request.responseType=="arraybuffer")
									buffer=packdata_request.response;
								else if (packdata_request.mozResponseArrayBuffer != null)
									buffer = packdata_request.mozResponseArrayBuffer;
								else
									buffer=packdata_request.response;

								mandreel_fs_saveFile(new_name, buffer);

								var uri = mandreel_arrayBufferDataUri(0,buffer.byteLength,buffer);

								image.src = uri;

							}
							else
							{

								Mandreel_TextureAsync_textures_loaded++;

							}
						}

						packdata_request.send();

					}
				}
				);
			}
			else if (mandreel_is_indexeddb())
			{
				image_src_valid = false;

				var new_name = mandreel_texture_async_fix_name(full_name);
				mandreel_indexedDB.load(new_name,function Mandreel_TextureAsync_Load_IDB(data) {
					if (data)
					{
						 var URL = Mandreel_window.URL || Mandreel_window.webkitURL;


						// Create and revoke ObjectURL
						imgURL = URL.createObjectURL(data);

						image.src = imgURL;
					}
					else
					{
						var packdata_request = new XMLHttpRequest();

						packdata_request.open("GET", full_name, true);

						 packdata_request.responseType = "blob";



						packdata_request.onreadystatechange = function()
						{
							if (packdata_request.readyState != 4) return;

							if (packdata_request.status == 200)
							{
								var buffer=packdata_request.response;

								 var URL = Mandreel_window.URL || Mandreel_window.webkitURL;

								// Create and revoke ObjectURL
								imgURL = URL.createObjectURL(buffer);

								image.src = imgURL;

								mandreel_fs_saveFile(new_name, buffer);

							}
							else
							{

								Mandreel_TextureAsync_textures_loaded++;

							}
						}

						packdata_request.send();
					}

				}
				);
			}
			else
				image_src = full_name;
		}
	}


	if (image_src_valid)
	{
		setTimeout( function Mandreel_TextureAsync_Load_callback() {
						image.src = image_src;
					}, 1);
	}
}