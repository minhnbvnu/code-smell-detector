function x0000_Connected_2_Connected_X_iINVITEorUPDATE(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret;
	
	var b_bodiless_invite;
	var e_old_media_type = o_dialog.o_msession_mgr ? o_dialog.o_msession_mgr.get_media_type() : tmedia_type_e.NONE;
    var b_is_roap = o_dialog.o_msession_mgr ? o_dialog.o_msession_mgr.is_roap() : false;
	var e_new_media_type;
	var b_force_sdp;

    o_dialog.o_last_iOffer = o_request;

     // swictch before calling process_ro()
    if(b_is_roap){
        o_dialog.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.SUCCESS;
    }

	/* process remote offer */
	if ((i_ret = o_dialog.process_ro(o_request, true))) {
        return i_ret;
    }

	// force SDP in 200 OK even if the request has the same SDP version
	b_force_sdp = o_request.has_content();
	
	// get new media_type after processing the remote offer
	e_new_media_type = o_dialog.o_msession_mgr ? o_dialog.o_msession_mgr.get_media_type() : tmedia_type_e.NONE;
	
	/** response to bodiless iINVITE always contains SDP as explained below
		RFC3261 - 14.1 UAC Behavior 
		   The same offer-answer model that applies to session descriptions in 
		   INVITEs (Section 13.2.1) applies to re-INVITEs.  As a result, a UAC 
		   that wants to add a media stream, for example, will create a new 
		   offer that contains this media stream, and send that in an INVITE 
		   request to its peer.  It is important to note that the full 
		   description of the session, not just the change, is sent.  This 
		   supports stateless session processing in various elements, and 
		   supports failover and recovery capabilities.  Of course, a UAC MAY 
		   send a re-INVITE with no session description, in which case the first 
		   reliable non-failure response to the re-INVITE will contain the offer 
		   (in this specification, that is a 2xx response).
	*/
	b_bodiless_invite = !o_request.has_content() && o_request.is_invite();

	/* session timers (must be before sending response) */
    // FIXME: session-timers
	//if(self->stimers.timer.timeout){
	//	tsip_dialog_invite_stimers_handle(self, rINVITEorUPDATE);
	//}

	/* hold/resume */
    i_ret = o_dialog.hold_handle (o_request);

	// send the response
    if(!b_is_roap){
	    i_ret = o_dialog.send_response(o_request, 200, "OK",
		    (o_dialog.o_msession_mgr && (b_force_sdp || b_bodiless_invite || o_dialog.o_msession_mgr.has_ro_changed() || o_dialog.o_msession_mgr.has_state_changed() || (e_old_media_type != e_new_media_type))));
    }

	/* alert the user */
	o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);
	

	return i_ret;
}