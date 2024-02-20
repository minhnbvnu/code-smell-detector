function stressTest(state) {
        state = extend({
          times: 0, beforeTest: null, afterTest: null,
          elms: indexElements(state.all), results: {}, finish: null
        }, state);

        //the first test scrolls down
        window.scrollTo(0, 0);

        var queue = state.queue = Object_keys(state.elms),
            testfinish = function (className, time) {
                if (queue.length > 0 && !state.cancel) {
                    testSelector(queue.shift(), state, testfinish);
                } else {
                    unbind(document, 'keydown.stressTest');
                    if (state.finish) state.finish();
                }
            };

        bind(document, 'keydown.stressTest', function (e) {
            if (e.keyCode == 27) state.cancel = true;
        });

        /* figure out how many tests to run */
        state.times = 15;
        testSelector(baselineName, state, function (c, time) {
            state.times = Math.round(15*3/time*750); //each selector should take at least 750ms*3 to run
            testSelector(baselineName, state, testfinish);
        });
    }