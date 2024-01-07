function hasAudioContext() {
    return !!(typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined');
}