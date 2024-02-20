function w4aPeerConnection_NPAPI_OnEvent(o_peer, sMedia, sLabel, bMoreToFollow) {
    o_peer.onIceCallback(sMedia, sLabel, bMoreToFollow);
}