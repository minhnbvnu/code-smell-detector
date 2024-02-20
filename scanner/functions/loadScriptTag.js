function loadScriptTag(callback) {
            // import YouTube API
            if ( window.YT === undefined ) {
                var tag = document.createElement('script');
                tag.setAttribute('id','youtube-script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                callback();
            }
            window.onYouTubeIframeAPIReady = callback;
        }