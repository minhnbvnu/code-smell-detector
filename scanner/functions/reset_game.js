function reset_game() {
    $systemPrint('Resetting the game' + ($lastBecause ? ' because "' + $lastBecause + '"' : ''));
    throw {reset_game:1};
}