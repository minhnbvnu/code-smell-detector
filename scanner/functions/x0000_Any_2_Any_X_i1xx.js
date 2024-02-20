function x0000_Any_2_Any_X_i1xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_r1xx = ao_args[1];
    var i_ret = 0;

    /* Update the dialog state */
    if ((i_ret = o_dialog.update_with_response(o_r1xx))) {
        return i_ret;
    }

    /* RFC 3262 - 4 UAC Behavior
    If a provisional response is received for an initial request, and
    that response contains a Require header field containing the option
    tag 100rel, the response is to be sent reliably.  If the response is
    a 100 (Trying) (as opposed to 101 to 199), this option tag MUST be
    ignored, and the procedures below MUST NOT be used.

    Assuming the response is to be transmitted reliably, the UAC MUST
    create a new request with method PRACK.  This request is sent within
    the dialog associated with the provisional response (indeed, the
    provisional response may have created the dialog).  PRACK requests
    MAY contain bodies, which are interpreted according to their type and
    disposition.

    Note that the PRACK is like any other non-INVITE request within a
    dialog.  In particular, a UAC SHOULD NOT retransmit the PRACK request
    when it receives a retransmission of the provisional response being
    acknowledged, although doing so does not create a protocol error.
	 
    Additional information: We should only process the SDP from reliable responses (require:100rel)
    but there was many problem with some clients sending SDP with this tag: tiscali, DTAG, samsung, ...
    */
    
    if ((o_r1xx.get_response_code() >= 101 && o_r1xx.get_response_code() <= 199)) {
        /* Process Remote offer */
        var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_lo();
        if (o_r1xx.has_content() && (i_ret = o_dialog.process_ro(o_r1xx, b_is_offer))) {
            /* FIXME: Send Error */
            return i_ret;
        }
        // don't send PRACK if 100rel is only inside "supported" header
        if (o_r1xx.is_required("100rel") && (i_ret = o_dialog.send_prack(o_r1xx))) {
            return i_ret;
        }
    }

    // alert user
    i_ret = o_dialog.signal_invite(tsip_event_invite_type_e.I_AO_REQUEST, o_r1xx.get_response_code(), o_r1xx.get_response_phrase(), o_r1xx);

    if (o_dialog.b_is_transf) {
        i_ret = o_dialog.notify_parent(o_r1xx);
    }

    return i_ret;
}