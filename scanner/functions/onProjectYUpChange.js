function onProjectYUpChange(target) {
    gameSource.json.y_up = (target.checked === true);
    serverSaveGameJSON();
}