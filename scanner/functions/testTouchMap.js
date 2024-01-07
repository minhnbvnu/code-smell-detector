function testTouchMap(startTouches, moveTouches, events) {
        for (var p in events) {
            map.on(p, events[p]);
        }
        map.on('touchactstart', function () {
            happen.once(document, {
                'type' : 'touchmove',
                'touches' : moveTouches
            });
            happen.once(document, {
                'type':'touchend',
                'touches' : moveTouches
            });
        });
        if (!map.isLoaded()) {
            map.on('load', function () {
                happen.once(eventContainer, {
                    'type' : 'touchstart',
                    'touches' : startTouches
                });
            });
        } else {
            happen.once(eventContainer, {
                'type' : 'touchstart',
                'touches' : startTouches
            });
        }
    }