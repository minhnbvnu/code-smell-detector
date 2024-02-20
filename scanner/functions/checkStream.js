function checkStream () {

                if (retry > 0)
                {
                    if (self.video.videoWidth > 0)
                    {
                        // Patch for Firefox bug where the height can't be read from the video
                        var width = self.video.videoWidth;
                        var height = self.video.videoHeight;

                        if (isNaN(self.video.videoHeight))
                        {
                            height = width / (4/3);
                        }

                        self.video.play();

                        self.isStreaming = true;
                        self.baseTexture.source = self.video;
                        self.updateTexture(null, width, height);
                        self.onAccess.dispatch(self);
                    }
                    else
                    {
                        window.setTimeout(checkStream, 500);
                    }
                }
                else
                {
                    console.warn('Unable to connect to video stream. Webcam error?');
                }

                retry--;
            }