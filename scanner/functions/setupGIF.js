function setupGIF() {
  background(255);
  gif = new GIF({
    workers: 16,
    quality: 10000,
    debug: true,
    workerScript: '../../libraries/gif.js/gif.worker.js'
  });
  gif.on('finished', function(blob) {
    saveAs(blob, gd.timestamp() + '.gif');
    setupGIF();
  });
}