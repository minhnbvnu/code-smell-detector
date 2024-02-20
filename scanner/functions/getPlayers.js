function getPlayers() {
        var players = [];
        if (players.length == 0) {
            var tmp = document.getElementsByTagName('object');
            players = tmp;
        }
        
        if (players.length == 0 || players[0].object == null) {
            var tmp = document.getElementsByTagName('embed');
            players = tmp;
        }
        return players;
    }