function fireCallback() {
            var fire = true;
            /*$.each(Object.keys(loaded), function() {
                if (loaded[this] > 0)
                    fire = false;
            });*/
            if (fire && options.callback) {
                options.callback();
            }
        }