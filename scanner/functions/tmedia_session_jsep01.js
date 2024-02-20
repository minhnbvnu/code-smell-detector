function tmedia_session_jsep01(o_mgr) {
    tmedia_session_jsep.call(this, o_mgr);
    this.o_media_constraints =
    {
        'mandatory':
          {
              'OfferToReceiveAudio': !!(this.e_type.i_id & tmedia_type_e.AUDIO.i_id),
              'OfferToReceiveVideo': !!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id)
          }
    };

    if (tsk_utils_get_navigator_friendly_name() == 'firefox') {
        tmedia_session_jsep01.mozThis = this; // FIXME: no longer needed? At least not needed on FF 34.05
        this.o_media_constraints.mandatory.MozDontOfferDataChannel = true;
    }
}