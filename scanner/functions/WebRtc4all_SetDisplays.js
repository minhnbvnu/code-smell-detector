function WebRtc4all_SetDisplays(o_local_elt, o_remote_elt, o_local_screencast_elt) {
    if (__webrtc_type == WebRtcType_e.IE) {
        // visiblity must be "visible"  for the first time to force handle creation
        if (o_local_elt) {
            o_local_elt.innerHTML = "<object id=\"__o_display_local\" classid=\"clsid:69E4A9D1-824C-40DA-9680-C7424A27B6A0\"" +
                                    " width=\"100%\" height=\"100%\" style=\"visibility:visible;\"> </object>";
            __o_display_local.style.visibility = "hidden";
        }
        if (o_local_screencast_elt) {
            o_local_screencast_elt.innerHTML = "<object id=\"__o_display_local_screencast\" classid=\"clsid:69E4A9D1-824C-40DA-9680-C7424A27B6A0\"" +
                                    " width=\"100%\" height=\"100%\" style=\"visibility:visible;\"> </object>";
            __o_display_local_screencast.style.visibility = "hidden";
        }
        if (o_remote_elt) {
            o_remote_elt.innerHTML = "<object id=\"__o_display_remote\" classid=\"clsid:69E4A9D1-824C-40DA-9680-C7424A27B6A0\"" +
                                     " width=\"100%\" height=\"100%\" style=\"visibility:visible;\"> </object>";
            __o_display_remote.style.visibility = "hidden";
        }
    }
    else if (__webrtc_type == WebRtcType_e.NPAPI) {
        if (o_local_elt) {
            o_local_elt.innerHTML = "<object id=\"__o_display_local\" type=\"application/w4a\"" +
                                    " width=\"100%\" height=\"100%\" style=\"visibility:visible; border:1px solid #000;\"> </object>";
            __o_display_local.style.visibility = "hidden";
        }
        if (o_local_screencast_elt) {
            o_local_screencast_elt.innerHTML = "<object id=\"__o_display_local_screencast\" type=\"application/w4a\"" +
                                    " width=\"100%\" height=\"100%\" style=\"visibility:visible; border:1px solid #000;\"> </object>";
            __o_display_local_screencast.style.visibility = "hidden";
        }
        if (o_remote_elt) {
            o_remote_elt.innerHTML = "<object id='__o_display_remote' type='application/w4a'" +
                                     "  width='100%' height='100%' style='visibility:visible; border:1px solid #000;'> </object>";
            __o_display_remote.style.visibility = "hidden";
        }
    }
}