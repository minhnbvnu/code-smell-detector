function onProjectMIDISysexChange(target) {
    gameSource.json.midi_sysex = (target.checked === true);
    serverSaveGameJSON();
}