function __tsip_dialog_register_InProgress_2_Connected_X_2xx(ao_args) {
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    var i_ret;
	var b_first_time_to_connect = (o_dialog.e_state == tsip_dialog_state_e.INITIAL);
    var o_stack = o_dialog.get_stack();

	/*	- Set P-associated-uriS
	*	- Update service-routes
	*	- Update Pats
	*/
	{
		var i_index;
		var o_hdr_Path;
		var o_hdr_Service_Route;
		var o_hdr_P_Associated_URI;
		
        o_stack.ao_uri_associated_uris.splice(0, o_stack.ao_uri_associated_uris.length);
        o_stack.ao_uri_service_routes.splice(0, o_stack.ao_uri_service_routes.length);
        o_stack.ao_uri_paths.splice(0, o_stack.ao_uri_paths.length);

		/* Associated URIs */
		for(i_index = 0; (o_hdr_P_Associated_URI = o_response.get_header_at(tsip_header_type_e.P_Associated_URI, i_index)); ++i_index){
            if(o_hdr_P_Associated_URI.o_uri){
                o_stack.ao_uri_associated_uris.push(o_hdr_P_Associated_URI.o_uri);
            }
		}

		/*	Service-Route (3GPP TS 24.229)
			store the list of service route values contained in the Service-Route header field and bind the list to the contact
			address used in registration, in order to build a proper preloaded Route header field value for new dialogs and
			standalone transactions when using the respective contact address.
		*/
		for(i_index = 0; (o_hdr_Service_Route = o_response.get_header_at(tsip_header_type_e.Service_Route, i_index)); ++i_index){
            if(o_hdr_Service_Route.o_uri){
                o_stack.ao_uri_service_routes.push(o_hdr_Service_Route.o_uri);
            }
		}

		/* Paths */
		for(i_index = 0; (o_hdr_Path = o_response.get_header_at(tsip_header_type_e.Path, i_index)); ++i_index){
			if(o_hdr_Path.o_uri){
                o_stack.ao_uri_paths.push(o_hdr_Path.o_uri);
            }
		}
	}

	/* 3GPP TS 24.229 - 5.1.1.2 Initial registration */
	if(b_first_time_to_connect){
		var b_barred = true;
		var o_uri;
		var o_uri_first = null;

	/*	
		b) store as the default public user identity the first URI on the list of URIs present in the P-Associated-URI header
		field and bind it to the respective contact address of the UE and the associated set of security associations or TLS
		session;
		NOTE 4: When using the respective contact address and associated set of security associations or TLS session, the
		UE can utilize additional URIs contained in the P-Associated-URI header field and bound it to the
		respective contact address of the UE and the associated set of security associations or TLS session, e.g. for
		application purposes.
		c) treat the identity under registration as a barred public user identity, if it is not included in the P-Associated-URI
		header field;
	*/
		for(i_index = 0; i_index < o_stack.ao_uri_associated_uris.length; ++i_index){
            if(!(o_uri = o_stack.ao_uri_associated_uris[i_index].o_uri)){
                continue;
            }
			if(i_index == 0){
				o_uri_first = o_stack.ao_uri_associated_uris[i_index].o_uri;
			}
            if (o_stack.identity.o_uri_pref.compare(o_uri) == 0) {
				b_barred = false;
				break;
			}
		}

		if(b_barred && o_uri_first){
            o_stack.identity.o_uri_pref = o_uri_first;
		}
	}
	
	// Update the dialog state
	if((i_ret = o_dialog.update_with_response(o_response)) != 0){
		return i_ret;
	}
	
	// Reset current action */
	o_dialog.set_action_curr(null);
	
	// Request timeout for dialog refresh (re-registration)
	o_dialog.i_timerRefresh = o_dialog.get_newdelay(o_response);
	o_dialog.timer_schedule('register', 'Refresh');

	// alert user
	o_dialog.signal_register(tsip_event_register_type_e.AO_REGISTER, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
	if (b_first_time_to_connect) {
	    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "Connected");
	}
	
	return i_ret;
}