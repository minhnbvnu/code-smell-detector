function speedUpVideo (win) {
          let video = win.document.querySelector('html > div > video');
          if (video)
            video.playbackRate = video.playbackRate == video.defaultPlaybackRate ? 3 : video.defaultPlaybackRate;
        }