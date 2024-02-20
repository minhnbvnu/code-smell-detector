function preventFab$1(source) {
      hit(source);

      // redefines Fab function for adblock detection
      var Fab = function Fab() {};
      Fab.prototype.check = noopFunc;
      Fab.prototype.clearEvent = noopFunc;
      Fab.prototype.emitEvent = noopFunc;
      Fab.prototype.on = function (a, b) {
        if (!a) {
          b();
        }
        return this;
      };
      Fab.prototype.onDetected = noopThis;
      Fab.prototype.onNotDetected = function (a) {
        a();
        return this;
      };
      Fab.prototype.setOption = noopFunc;
      Fab.prototype.options = {
        set: noopFunc,
        get: noopFunc
      };
      var fab = new Fab();
      var getSetFab = {
        get() {
          return Fab;
        },
        set() {}
      };
      var getsetfab = {
        get() {
          return fab;
        },
        set() {}
      };

      // redefined Fab data properties which if 'FuckAdBlock' variable exists
      if (Object.prototype.hasOwnProperty.call(window, 'FuckAdBlock')) {
        window.FuckAdBlock = Fab;
      } else {
        // or redefined Fab accessor properties
        Object.defineProperty(window, 'FuckAdBlock', getSetFab);
      }
      if (Object.prototype.hasOwnProperty.call(window, 'BlockAdBlock')) {
        window.BlockAdBlock = Fab;
      } else {
        Object.defineProperty(window, 'BlockAdBlock', getSetFab);
      }
      if (Object.prototype.hasOwnProperty.call(window, 'SniffAdBlock')) {
        window.SniffAdBlock = Fab;
      } else {
        Object.defineProperty(window, 'SniffAdBlock', getSetFab);
      }
      if (Object.prototype.hasOwnProperty.call(window, 'fuckAdBlock')) {
        window.fuckAdBlock = fab;
      } else {
        Object.defineProperty(window, 'fuckAdBlock', getsetfab);
      }
      if (Object.prototype.hasOwnProperty.call(window, 'blockAdBlock')) {
        window.blockAdBlock = fab;
      } else {
        Object.defineProperty(window, 'blockAdBlock', getsetfab);
      }
      if (Object.prototype.hasOwnProperty.call(window, 'sniffAdBlock')) {
        window.sniffAdBlock = fab;
      } else {
        Object.defineProperty(window, 'sniffAdBlock', getsetfab);
      }
    }