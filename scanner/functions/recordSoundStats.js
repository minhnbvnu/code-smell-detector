function recordSoundStats(sound) {
    if (sound.$name[0] !== '_') {
        ++resourceStats.sounds;
        const count = Math.ceil(4 * sound.$buffer.numberOfChannels * sound.$buffer.length / 1024);
        resourceStats.soundKilobytes += count;
        resourceStats.soundKilobytesByURL[sound.$url] = count;
    }
}