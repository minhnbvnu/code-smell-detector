function videoInit() {
      if (
        game.device.safari ||
        game.device.mobileSafari ||
        game.device.iOS ||
        game.device.android
      ) {
        userVideo = game.add.video();

        userVideo.video = document.createElement("video");
        userVideo.video.setAttribute("autoplay", "autoplay");
        userVideo.video.setAttribute("playsinline", "playsinline");

        const constraints = {
          video: true,
          audio: false,
          aspectRatio: 640 / 480,
          width: 640,
          height: 480,
          facingMode: { exact: "user" },
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            userVideo.videoStream = stream;

            if (userVideo.video.mozSrcObject !== undefined) {
              userVideo.video.mozSrcObject = stream;
            } else if (userVideo.video.srcObject !== undefined) {
              userVideo.video.srcObject = stream;
            } else {
              userVideo.video.src =
                (window.URL && window.URL.createObjectURL(stream)) || stream;
            }

            userVideo.video.onloadeddata = function () {
              var retry = 10;

              function checkStream() {
                if (retry > 0) {
                  if (userVideo.video.videoWidth > 0) {
                    var width = userVideo.video.videoWidth;
                    var height = userVideo.video.videoHeight;

                    if (isNaN(userVideo.video.videoHeight)) {
                      height = width / (4 / 3); // sup with this hardcoded aspect ratio? can't be great
                    }

                    userVideo.video.play();

                    userVideo.isStreaming = true;
                    userVideo.baseTexture.source = userVideo.video;
                    userVideo.updateTexture(null, width, height);
                    userVideo.onAccess.dispatch(userVideo);
                  } else {
                    window.setTimeout(checkStream, 500);
                  }
                } else {
                  // console.warn('Unable to connect to video stream. Webcam error?');
                }

                retry -= 1;
              }

              checkStream();
            };

            userVideo.onAccess.addOnce(() => {
              // TODO: gracefully handle user video errors (pause the experience and display error message?)
              userVideo.onError.removeAll();
              game.state.start("load");
            }, this);
          })
          .catch((err) => {
            // Handle this error!
          });
      } else {
        userVideo = game.add.video();
        userVideo.startMediaStream();

        userVideo.onError.addOnce(() => {
          // The user has refused webcam access - let's politely explain that they can't watch the movie without granting access
        }, this);

        userVideo.onAccess.addOnce(() => {
          // TODO: gracefully handle user video errors (pause the experience and display error message?)
          userVideo.onError.removeAll();
          game.state.start("load");
        }, this);
      }
    }