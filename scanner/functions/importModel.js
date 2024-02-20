function importModel(serializedModelData)
{
    // Stop playback to avoid glitching
    stopPlayback();

    model.deserialize(serializedModelData);
}