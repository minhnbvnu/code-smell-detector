function rewindVideo (win) {
          let video = win.document.querySelector('html > div > video');
          if (video)
            video.currentTime -= 5;
        }