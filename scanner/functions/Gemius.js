function Gemius(source) {
      var GemiusPlayer = function GemiusPlayer() {};
      GemiusPlayer.prototype = {
        setVideoObject: noopFunc,
        newProgram: noopFunc,
        programEvent: noopFunc,
        newAd: noopFunc,
        adEvent: noopFunc
      };
      window.GemiusPlayer = GemiusPlayer;
      hit(source);
    }