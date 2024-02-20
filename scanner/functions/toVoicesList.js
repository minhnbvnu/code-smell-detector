function toVoicesList(voices) {
        var voicesList = [];
        for (let voice of voices) {
            var item = {
                default: voice.default,
                lang: voice.lang,
                local_service: voice.localService,
                name: voice.name,
                voice_uri: voice.voiceURI,
            };
            voicesList.push(item);
        }
        return voicesList;
    }