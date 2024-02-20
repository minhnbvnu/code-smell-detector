function WebRtc4all_Init() {
    if (!__b_webrtc4all_initialized) {
        // WebRtc plugin type
        try {
            if (__webrtc_type == WebRtcType_e.NONE) {
                window.nativeURL = (window.webkitURL || window.URL);
                if ((navigator.getUserMedia && window.RTCPeerConnection)) {
                    __webrtc_type = WebRtcType_e.NATIVE; // Google Chrome
                }
           }
        }
        catch (e) { }
        if (__webrtc_type == WebRtcType_e.NONE || __webrtc_type == WebRtcType_e.W4A) {
            var div = document.createElement('div');
            div.id = "__webrtc4ie.pluginInstance.id";
            try { 
                new ActiveXObject("webrtc4ie.PluginInstance");
                
                div.innerHTML = "<object id=\"__webrtc_plugin\" classid=\"clsid:69E4A9D1-824C-40DA-9680-C7424A27B6A0\" width=\"0px%\" height=\"0px%\" style=\"visibility:visible;\"> </object>";
                __webrtc_type = WebRtcType_e.IE; // Internet Explorer
            }
            catch(e) {
                try {
                    div.innerHTML = "<embed id=\"__webrtc_plugin\" type=\"application/w4a\" width=\"0px\" height=\"0px\" style=\"visibility:visible;\"> </embed>";
                    __webrtc_type = WebRtcType_e.NPAPI; // Opera, Firefox or Safari
                }
                catch (e) { }
            }
            div.style = 'visibility:visible; width:0px; height:0px';
            document.body.appendChild(div);
        }

        __b_webrtc4all_initialized = true;
    }
}