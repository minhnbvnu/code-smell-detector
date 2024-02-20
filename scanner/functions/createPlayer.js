function createPlayer(opts) {
    return new Promise((res, rej) => {
        opts.onReady = res;
        player = new Player(opts);
    });
}