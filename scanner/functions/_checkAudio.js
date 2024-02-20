function _checkAudio () {

        device.audioData = !!(window['Audio']);
        device.webAudio = !!(window['AudioContext'] || window['webkitAudioContext']);
        var audioElement = document.createElement('audio');
        var result = false;

        try {
            if (result = !!audioElement.canPlayType)
            {
                if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
                {
                    device.ogg = true;
                }

                if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, ''))
                {
                    device.opus = true;
                }

                if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, ''))
                {
                    device.mp3 = true;
                }

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
                {
                    device.wav = true;
                }

                if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, ''))
                {
                    device.m4a = true;
                }

                if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''))
                {
                    device.webm = true;
                }

                if (audioElement.canPlayType('audio/mp4;codecs="ec-3"') !== '')
                {
                    if (device.edge)
                    {
                        device.dolby = true;
                    }
                    else if (device.safari && device.safariVersion >= 9)
                    {
                        if (/Mac OS X (\d+)_(\d+)/.test(navigator.userAgent))
                        {
                            var major = parseInt(RegExp.$1, 10);
                            var minor = parseInt(RegExp.$2, 10);

                            if ((major === 10 && minor >= 11) || major > 10)
                            {
                                device.dolby = true;
                            }
                        }
                    }
                }
            }
        } catch (e) {
        }

    }