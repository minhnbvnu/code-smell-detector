function onRemoveScript(scriptURL) {
    const index = gameSource.scripts.indexOf(scriptURL);
    console.assert(index !== -1);
    gameSource.json.scripts.splice(index, 1);
    serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
}