function quit_game() {
    $systemPrint('Quitting the game' + ($lastBecause ? ' because "' + $lastBecause + '"' : ''));
    throw {quit_game:1};
}