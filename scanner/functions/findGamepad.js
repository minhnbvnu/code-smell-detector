function findGamepad(id) {

    var gamepads = navigator.getGamepads && navigator.getGamepads();

    for (var i = 0, j = 0, l = gamepads.length; i < l; i++) {

      var gamepad = gamepads[i];

      if (gamepad && (gamepad.id === 'Daydream Controller' ||
          gamepad.id === 'Gear VR Controller' || gamepad.id === 'Oculus Go Controller' ||
          gamepad.id === 'OpenVR Gamepad' || gamepad.id.startsWith('Oculus Touch') ||
          gamepad.id.startsWith('Spatial Controller'))) {

        if (j === id) return gamepad;

        j++;

      }

    }

  }