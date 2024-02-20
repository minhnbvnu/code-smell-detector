function startPlayback()
{
    if (model.playing)
        return;

    console.log('starting playback');

    // Hide the play button
    btnPlay.style.display = 'none';
    btnStop.style.display = 'inline-flex';

    // Send the play action to the model
    model.update(new Play());
}