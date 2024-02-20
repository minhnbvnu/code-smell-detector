function onRemoveDoc(docURL) {
    const index = gameSource.docs.indexOf(docURL);
    console.assert(index !== -1);
    gameSource.json.docs.splice(index, 1);
    serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
}