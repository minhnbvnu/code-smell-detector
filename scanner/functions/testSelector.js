function testSelector(selector, state, finished) {
        var elms = state.elms[selector] || [];
        removeSelector(elms, selector);
        if(state.beforeTest) state.beforeTest({ elms: elms, selector: selector });
        stress(state, state.times, function (time) {
            addSelector(elms, selector);
            if (selector == baselineName) {
                state.baseTime = time;
            } else {
                state.results[selector] = {
                    length: elms.length,
                    children: getChildren(elms).length,
                    time: time,
                    delta: time - state.baseTime
                };
                if(state.afterTest) {
                  state.afterTest({ elms: elms, selector: selector, result: state.results[selector] });
                }
            }
            finished(selector, time);
        });
    }