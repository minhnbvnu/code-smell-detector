function stopGIFRecording() {
    if (gifRecording) {
        // Save
        document.getElementById('recording').innerHTML = 'Encoding GIF…';
        gifRecording.render();
        gifRecording = null;
    }
}