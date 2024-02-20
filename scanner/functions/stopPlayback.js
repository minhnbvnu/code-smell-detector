function stopPlayback()
{
    if (!model.playing)
        return;

    console.log('stopping playback');

    // Hide the stop button
    btnPlay.style.display = 'inline-flex';
    btnStop.style.display = 'none';

    // Send the stop action to the model
    model.update(new Stop());
}