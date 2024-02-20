function __tsip_dialog_invite_media_callback(o_self, e_event_type, e_media_type, s_decription/*optional*/) {
    var i_ret;

    switch (e_event_type) {
        case tmedia_session_events_e.GET_LO_SUCCESS:
            {
                o_self.timer_cancel('LoSdpRequest');
                if (o_self.o_wait_oMessage) {
                    var o_sdp_lo = o_self.o_msession_mgr.get_lo();
                    var s_sdp_lo = null;
                    if (o_sdp_lo && (s_sdp_lo = o_sdp_lo.toString())) {
                        o_self.o_wait_oMessage.add_content(new String(s_sdp_lo), "application/sdp");
                        // tsk_utils_log_info("sending=" + o_self.o_wait_oMessage.toString());
                        if (o_self.o_wait_oMessage.is_request()) {
                            if (o_self.o_wait_oMessage.is_ack()) {
                                i_ret = o_self.get_stack().o_layer_transport.send(null, o_self.o_wait_oMessage);
                            }
                            else {
                                i_ret = o_self.request_send(o_self.o_wait_oMessage);
                                if (i_ret == 0 && o_self.o_wait_oMessage.is_invite()) {
                                    o_self.o_last_oInvite = o_self.o_wait_oMessage;
                                }
                            }
                        }
                        else {
                            i_ret = o_self.response_send(o_self.o_wait_oMessage);
                        }
                    }
                    o_self.o_wait_oMessage = null;
                }
                else {
                    // /!\do not send early media (18x with SDP)
                    if (/*o_self.e_state == tsip_dialog_state_e.EARLY ||*/ o_self.e_state == tsip_dialog_state_e.ESTABLISHED) {
                        if (o_self.e_next_offer_type == tsip_dialog_invite_next_offer_type_e.SUCCESS && o_self.o_last_iOffer) {
                            i_ret = o_self.send_response(o_self.o_last_iOffer, 200, "OK", true);
                        }
                        else {
                            i_ret = o_self.send_offer(true, true); // always send INVITE because we use the ACK to ensure the media
                        }
                    }
                }
                if (o_self.o_msession_mgr && !o_self.o_msession_mgr.is_started() && (o_self.o_msession_mgr.has_lo() && o_self.o_msession_mgr.has_ro())) {
                    i_ret = o_self.o_msession_mgr.start();
                }

                o_self.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.NONE;
                break;
            }
        case tmedia_session_events_e.GET_LO_FAILED:
            {
                o_self.timer_cancel('LoSdpRequest');
                o_self.set_last_error(tsip_event_code_e.DIALOG_WEBRTC_ERROR, "Failed to get local SDP offer");
                o_self.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.NONE;

                var o_action = new tsip_action(tsip_action_type_e.HANGUP);
                o_action.set_line_resp(603, "Failed to get local SDP");
                o_self.hangup(o_action);
                break;
            }

        case tmedia_session_events_e.STREAM_LOCAL_REQUESTED:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_REQUESTED, tsip_event_code_e.DIALOG_MEDIA_LOCAL_REQUESTED, "Media Requested", null);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_ACCEPTED:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_ACCEPTED, tsip_event_code_e.DIALOG_MEDIA_LOCAL_ACCEPTED, "Media Accepted", null);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_REFUSED:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_REFUSED, tsip_event_code_e.DIALOG_MEDIA_LOCAL_REFUSED, "Media Refused", null);
                var o_action = new tsip_action(tsip_action_type_e.HANGUP);
                o_action.set_line_resp(603, "Media stream permission denied");
                o_self.hangup(o_action);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_ADDED:
            {
                o_self.get_session().__set_stream_local(o_self.o_msession_mgr.get_stream_local());
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_ADDED, tsip_event_code_e.DIALOG_MEDIA_ADDED, "Media Added", null);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_REMOVED:
            {
                o_self.get_session().__set_stream_local(null);
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_REMOVED, tsip_event_code_e.DIALOG_MEDIA_REMOVED, "Media Removed", null);
                break;
            }
        case tmedia_session_events_e.STREAM_REMOTE_ADDED:
            {
                o_self.get_session().__set_stream_remote(o_self.o_msession_mgr.get_stream_remote());
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_REMOTE_ADDED, tsip_event_code_e.DIALOG_MEDIA_ADDED, "Media Added", null);
                break;
            }
        case tmedia_session_events_e.STREAM_REMOTE_REMOVED:
            {
                o_self.get_session().__set_stream_remote(null);
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_REMOTE_REMOVED, tsip_event_code_e.DIALOG_MEDIA_REMOVED, "Media Removed", null);
                break;
            }
        case tmedia_session_events_e.RFC5168_REQUEST_IDR:
            {
                o_self.send_info("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n" +
				" <media_control>\r\n" +
				"   <vc_primitive>\r\n" +
				"     <to_encoder>\r\n" +
				"       <picture_fast_update>\r\n" +
				"       </picture_fast_update>\r\n" +
				"     </to_encoder>\r\n" +
				"   </vc_primitive>\r\n" +
				" </media_control>\r\n", "application/media_control+xml");
                break;
            }
        case tmedia_session_events_e.BFCP_INFO:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_BFCP_INFO, tsip_event_code_e.DIALOG_BFCP_INFO, s_decription ? s_decription : "BFCP INFO", null);
                break;
            }
    }
}