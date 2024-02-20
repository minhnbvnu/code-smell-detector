function stripped_san(move) {
        return move.replace(/=/,'').replace(/[+#]?[?!]*$/,'');
    }