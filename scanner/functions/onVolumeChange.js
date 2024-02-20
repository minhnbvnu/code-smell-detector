function onVolumeChange() {
    volumeLevel = parseInt(document.getElementById('volumeSlider').value) / 100;
    localStorage.setItem('volumeLevel', '' + volumeLevel);
    audioContext.gainNode.gain.value = 0.2 * volumeLevel;
}