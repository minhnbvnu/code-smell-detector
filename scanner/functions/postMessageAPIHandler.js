function postMessageAPIHandler (event) {
  var scene = this;
  if (!event.data) { return; }

  switch (event.data.type) {
    case 'vr': {
      switch (event.data.data) {
        case 'enter':
          scene.enterVR();
          break;
        case 'exit':
          scene.exitVR();
          break;
      }
    }
  }
}