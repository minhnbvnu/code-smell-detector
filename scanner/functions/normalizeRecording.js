function normalizeRecording(rc) {
    return {
        id: rc.sid,

        // Date
        createdTime: rc.dateCreated,

        // Call
        call: rc.callSid,

        // Duration
        duration: Number(rc.duration),

        // Urls to read
        urls: {
            mp3: "https://api.twilio.com"+(rc.uri.slice(0, -5))+'.mp3'
        }
    };
}