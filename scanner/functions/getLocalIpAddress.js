function getLocalIpAddress() {
    const p = new Promise((resolve, reject) => {
        if (!(typeof (RTCPeerConnection) === "function")) {
            reject(new Error('WebRTC is not supported'));
            return;
        };
        const rtc = new RTCPeerConnection({
            iceServers: []
        });
        const timer = setTimeout(() => reject(new Error("Promise timed out")), 1000);
        rtc.onicecandidate = e => {
            if (e.candidate) {
                clearTimeout(timer),
                    resolve(e.candidate.candidate.split(" ", 5)[4]);
            };
        };
        if (!(typeof (rtc.createDataChannel) === "function")) {
            reject(new Error('createDataChannel is not supported'));
            return;
        };
        rtc.createDataChannel('');
        rtc.createOffer().then(d => rtc.setLocalDescription(d), e => reject(e));
    })
    return p;
}