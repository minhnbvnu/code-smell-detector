function stopAllSounds() {
    // Resume in case we were paused
    audioContext.resume();

    for (const handle of activeSoundHandleMap.keys()) {
        try { handle.$source.stop(); } catch (e) {}
    }
    activeSoundHandleMap.clear();
}