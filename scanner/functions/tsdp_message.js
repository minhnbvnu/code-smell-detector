function tsdp_message(s_addr, b_ipv6, i_version) {
    this.ao_headers = new Array();

    if (s_addr) {

        /*	RFC 3264 - 5 Generating the Initial Offer
        The numeric value of the session id and version in the o line MUST be 
        representable with a 64 bit signed integer.  The initial value of the version MUST be less than
        (2**62)-1, to avoid rollovers.
        */
        this.add_headers(
                new tsdp_header_V(0),
                new tsdp_header_O(
                    tsdp_message.prototype.__s_o_username_default,
                    tsdp_message.prototype.__i_o_session_id_default,
                    i_version,
                    "IN",
                    b_ipv6 ? "IP6" : "IP4",
                    s_addr));

        /*	RFC 3264 - 5 Generating the Initial Offer
        The SDP "s=" line conveys the subject of the session, which is
        reasonably defined for multicast, but ill defined for unicast.  For
        unicast sessions, it is RECOMMENDED that it consist of a single space
        character (0x20) or a dash (-).

        Unfortunately, SDP does not allow the "s=" line to be empty.
        */
        this.add_headers(new tsdp_header_S(tsdp_message.prototype.__s_s_value_default));

        /*	RFC 3264 - 5 Generating the Initial Offer
        The SDP "t=" line conveys the time of the session.  Generally,
        streams for unicast sessions are created and destroyed through
        external signaling means, such as SIP.  In that case, the "t=" line
        SHOULD have a value of "0 0".
        */
        this.add_headers(new tsdp_header_T(0, 0));
    }
}