function soundAfter(val) {
    let player = document.createElement('audio');
    amplifyMedia(player, amplifierList[val]);
    player.src = path.join(__dirname, '\\res\\sound\\' + (store.has('time-end-sound') ? store.get('time-end-sound') : 'tick') + '.mp3');
    player.loop = false;
    player.play();
}