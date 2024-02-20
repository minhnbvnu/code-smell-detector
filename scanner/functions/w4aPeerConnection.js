function w4aPeerConnection(s_configuration, f_IceCallback) {
    if (!__b_webrtc4all_initialized) {
        WebRtc4all_Init();
    }
    var This = this;
    var b_isInternetExplorer = (__webrtc_type == WebRtcType_e.IE);
    this.s_configuration = s_configuration;
    this.f_IceCallback = f_IceCallback;
    this.o_peer = WebRtc4all_GetPlugin().createPeerConnection();
    this.o_peer.Init(s_configuration);

    // attach displays if defined by the user
    This.attachDisplays();

    // register callback function
    if (b_isInternetExplorer) {
        eval("function This.o_peer::IceCallback(media, label, bMoreToFollow) { return This.onIceCallback (media, label, bMoreToFollow); }");
        eval("function This.o_peer::Rfc5168Callback(command) { return This.onRfc5168Callback(command); }");
        eval("function This.o_peer::BfcpCallback(description) { return This.onBfcpCallback(description); }");
    }
    else {
        this.o_peer.opaque = This;
        this.o_peer.setCallbackFuncName("w4aPeerConnection_NPAPI_OnEvent");
        this.o_peer.setRfc5168CallbackFuncName("w4aPeerConnection_NPAPI_OnRfc5168Event");
        this.o_peer.setBfcpCallbackFuncName("w4aPeerConnection_NPAPI_OnBfcpEvent");
    }
}