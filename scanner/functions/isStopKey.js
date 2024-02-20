function isStopKey(evt) {
        var cfg = {
          stopKeys: {37:1, 38:1, 39:1, 40:1}
        };

        var isStop = (cfg.stopKeys[evt.keyCode] || (cfg.moreStopKeys && cfg.moreStopKeys[evt.keyCode]));
        if (isStop) evt.preventDefault();
        return isStop;
      }