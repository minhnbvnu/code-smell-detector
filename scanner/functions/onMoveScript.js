function onMoveScript(scriptURL, deltaIndex) {
    const index = gameSource.scripts.indexOf(scriptURL);
    console.assert(index !== -1);

    const old = gameSource.json.scripts[index];
    gameSource.json.scripts[index] = gameSource.json.scripts[index + deltaIndex];
    gameSource.json.scripts[index + deltaIndex] = old;
    serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
}