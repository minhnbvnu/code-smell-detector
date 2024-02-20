function onGetBase64() {
    microm.getBase64().then(function(base64string) {
      console.log(base64string);
    });
  }