function Mandreel_HttpRequest_Send(sp)
{
	var _id = heap32[sp>>2];sp+=4;
	var ptr_data = heap32[sp>>2];sp+=4;
	var id = _id-1;

	var data;

	if (ptr_data)
		data = get_string_from_ptr(ptr_data);
	else
		data = null;

	var my_state = mandreel_js_mapping_ids[id];


	my_state.status = MANDREEL_HTTP_REQUEST_STATUS_BUSY;

	my_state.httpRequest.onreadystatechange = function()
	{
		if (my_state.httpRequest.readyState==4)
		{
			if (my_state.httpRequest.status==200)
			{
				var buffer;

				if (my_state.httpRequest.responseType=="arraybuffer")
					buffer=my_state.httpRequest.response;
				else if (my_state.httpRequest.mozResponseArrayBuffer != null)
					buffer = my_state.httpRequest.mozResponseArrayBuffer;
				else
					buffer=my_state.httpRequest.response;

				my_state.status = MANDREEL_HTTP_REQUEST_STATUS_FINISHED;
				my_state.buffer =  new Uint8Array(buffer);
				//alert(my_state.buffer.length);

				//alert(mandreel_js_mapping_ids[id].buffer);

			}
			else
				my_state.status = MANDREEL_HTTP_REQUEST_STATUS_ERROR;
		}
	}

	my_state.httpRequest.send(data);
}