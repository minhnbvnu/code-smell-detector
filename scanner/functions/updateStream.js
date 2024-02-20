function updateStream() {
            return that._findView().then(function(view) {
                if (canvasStream !== null) {
                    // Stop and remove tracks from previous canvas
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                        stream.removeTrack(track);
                        canvasStream.removeTrack(track);
                    });
                    canvasStream = null;
                }
                var canvas;
                if (view.isFrozen) {
                    canvas = document.createElement('canvas');
                    canvas.width = view.$frozenRenderer.width();
                    canvas.height = view.$frozenRenderer.height();
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(view.$frozenRenderer[0], 0, 0);
                } else {
                    canvas = view.renderer.domElement;
                }
                // Add tracks from canvas to stream
                canvasStream = canvas.captureStream(fps);
                canvasStream.getTracks().forEach(function(track) {
                    stream.addTrack(track);
                    if (track.requestFrame) {
                        (function() {
                            var orig = track.requestFrame.bind(track);
                            track.requestFrame = function() {
                                orig();
                                // Ensure we redraw to make stream pickup first frame on Chrome
                                // https://bugs.chromium.org/p/chromium/issues/detail?id=903832
                                view.tick();
                            };
                            track.requestFrame();

                        }());
                    }
                });

                // If renderer status changes, update stream
                that.listenToOnce(view, 'updatestream', updateStream);
            });
        }