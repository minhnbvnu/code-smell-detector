function loadSound(name, json, jsonURL) {
    const mp3URL = makeURLAbsolute(jsonURL, json.url);

    let sound = assetCache[jsonURL];
    if (sound) {
        // Print faux loading messages
        onLoadFileStart(mp3URL);
        onLoadFileComplete(mp3URL);
        return sound;
    }

    const forceReload = computeForceReloadFlag(mp3URL);

    assetCache[jsonURL] = sound = Object.seal({
        duration: 0,
        $loaded: false,
        $name: name,
        $src: mp3URL,
        $source: null,
        $buffer: null,
        $base_pan: clamp(json.pan || 0, 0, 1),
        $base_volume: clamp(json.volume || 1, 0, 100),
        $base_rate: clamp(json.rate || 1, 0, 100),
        $base_pitch: clamp(json.pitch || 1, 0, 100),
        $url: mp3URL,
        $type: 'sound',
        $json: json,
        $jsonURL: jsonURL});

    onLoadFileStart(mp3URL);
    loadManager.fetch(mp3URL, 'arraybuffer', null, function (arraybuffer) {
        // LoadManager can't see the async decodeAudioData calls
        ++loadManager.pendingRequests;

        try {
            audioContext.decodeAudioData(
                // The need for this apparently useless slice() is to
                // work around a Chrome multithreading bug
                // https://github.com/WebAudio/web-audio-api/issues/1175
                arraybuffer.slice(0),
                
                function onSuccess(buffer) {
                    sound.$buffer = buffer;
                    sound.$loaded = true;

                    // Create a buffer source, which primes this sound
                    // for playing without delay later.
                    sound.$source = audioContext.createBufferSource();
                    sound.$source.buffer = sound.$buffer;
                    sound.duration = sound.$source.buffer.duration;
                    onLoadFileComplete(json.url);
                    loadManager.markRequestCompleted(json.url, '', true);
                },
                
                function onFailure() {
                    loadManager.markRequestCompleted(mp3URL, 'unknown error', false);
                });
        } catch (e) {
            loadManager.markRequestCompleted(mp3URL, e, false);
        }
    }, loadFailureCallback, loadWarningCallback, forceReload);
    
    return sound;
}