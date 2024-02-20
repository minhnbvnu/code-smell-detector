function onProjectDualDPadChange(target) {
    gameSource.json.dual_dpad = (target.checked === true);
    serverSaveGameJSON();
}