function onProjectScreenSizeChange(target) {
    const res = JSON.parse(target.value);
    gameSource.json.screen_size = res;
    serverSaveGameJSON();
}