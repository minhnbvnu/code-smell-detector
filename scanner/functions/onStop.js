function onStop() {
    microm.stop().then(function(mp3) {
      status.innerHTML = 'Paused';
    });
  }