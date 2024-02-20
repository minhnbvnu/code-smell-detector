function Mandreel_HttpRequest_Create(sp)
{
	var ptr_url = heap32[sp>>2];sp+=4;
	var type = heap32[sp>>2];sp+=4;


	var url = get_string_from_ptr(ptr_url);


	var str_type = 'GET';
	if (type == MANDREEL_HTTP_REQUEST_MODE_GET)
		str_type = 'GET';
	else if (type == MANDREEL_HTTP_REQUEST_MODE_PUT)
		str_type = 'PUT';
	else if (type == MANDREEL_HTTP_REQUEST_MODE_POST)
		str_type = 'POST';

	var xmlhttp_get = new XMLHttpRequest();
	xmlhttp_get.open(str_type,url);

	if("responseType" in xmlhttp_get)
		xmlhttp_get.responseType="arraybuffer";
    else
	{
		xmlhttp_get.overrideMimeType('text/plain; charset=x-user-defined');
	}

	if (mandreel_js_mapping_ids_free.length == 0)
		mandreel_js_mapping_ids_free.push(mandreel_js_mapping_ids.length);

	var new_id = mandreel_js_mapping_ids_free.pop();

	var my_state = {
	buffer : null,
	httpRequest : xmlhttp_get,
	status : MANDREEL_HTTP_REQUEST_STATUS_INIT,
	offset_read : 0
  };



	mandreel_js_mapping_ids[new_id] = my_state;

	r_g0 = new_id+1;
}