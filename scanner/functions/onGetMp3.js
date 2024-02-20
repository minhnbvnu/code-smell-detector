function onGetMp3() {
    microm.getMp3().then(function(mp3) {
      console.log('onGetMp3', mp3);
    });
  }