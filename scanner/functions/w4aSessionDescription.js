function w4aSessionDescription(s_sdp) {
    if (!__b_webrtc4all_initialized) {
        WebRtc4all_Init();
    }
    this.o_sdp = WebRtc4all_GetPlugin().createSessionDescription();
    this.o_sdp.Init(s_sdp ? (s_sdp + "") : null);
}