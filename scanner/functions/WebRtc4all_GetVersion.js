function WebRtc4all_GetVersion() {
    try {
        return WebRtc4all_GetPlugin().version;
    } catch(e) {  }    
    return "0.0.0.0";
}