function showOpenGameDialog() {
    document.getElementById('openGameDialog').classList.remove('hidden');
    document.getElementById('openGameOpenButton').disabled = true;

    const gameListURL = location.origin + getQuadPath() + 'console/games.json';

    // Fetch the asset list
    LoadManager.fetchOne({forceReload: true}, gameListURL, 'json', null, function (json) {
        openGameFiles = json;
        if (! json.tests) {
            // Remove the alpha tester options
            let a = document.getElementById('openTestsOption');
            if (a) { a.remove(); }
            a = document.getElementById('openAlphaOption');
            if (a) { a.remove(); }
            if (json.mine && json.mine.length === 0) {
                // Select built-ins if I don't have any games
                document.getElementById('openGameType').value = 'builtins';
            }
        }

        // Sort by title
        for (const key in openGameFiles) {
            const array = openGameFiles[key];
            array.sort(titleComparator);
        }
        
        // Show/hide the mine option depending on whether it is populated
        document.getElementById('openMineOption').style.display = (json.mine && json.mine.length > 0) ? '' : 'none';
        onOpenGameTypeChange();
    });
}