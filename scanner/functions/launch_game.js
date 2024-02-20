function launch_game(url) {
    $systemPrint('Launching ' + url + ($lastBecause ? ' because "' + $lastBecause + '"' : ''));
    throw {launch_game:url};
}