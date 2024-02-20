function setTimer(media) {
      if (angular.isDefined(mediaTimer)) {
        return;
      }

      mediaTimer = $interval(function () {
          if (mediaDuration < 0) {
              mediaDuration = media.getDuration();
              if (q && mediaDuration > 0) {
                q.notify({duration: mediaDuration});
              }
          }

          media.getCurrentPosition(
            // success callback
            function (position) {
                if (position > -1) {
                    mediaPosition = position;
                }
            },
            // error callback
            function (e) {
                console.log('Error getting pos=' + e);
            });

          if (q) {
            q.notify({position: mediaPosition});
          }

      }, 1000);
  }