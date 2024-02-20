function makeGame(srcURL) {
    if (! isQuadserver) {
        // Can't create a game on this server
        if (window.confirm('This game is hosted on the web. You must launch quadplay✜ from a script on your computer to create a new game. Go to the quadplay✜ installer website now?')) {
            window.open('https://github.com/morgan3d/quadplay');
        }
        
        return;
    }
    
    const gameName = window.prompt('New Game Title', 'My New Game');
    if (gameName && gameName !== '') {
        // Mangle name
        const gameDir = makeGoodFilename(gameName);
        
        // Send the POST to make the game
        postToServer(
            {
                command: 'new_game',
                dir_name: gameDir,
                game_name: gameName,
                src_url: srcURL
            },
            function (response, code) {
                // Success. Load the new game and reselect the main page.
                loadGameIntoIDE(response.game, function () {
                    onProjectSelect(document.getElementsByClassName('projectTitle')[0], 'game');
                });
            },
            
            function (resonse, code) {
                // Failure. Warn the user why
                alert(`Could not create the game "${gameName}" because a similar directory name "${gameDir}" already exists in your my_quadplay folder in your home folder.`);
            });
    }
}