function _mhchemCreateTransitions(o) {
        var pattern, state;
        var transitions = {};
        for (pattern in o) {
            for (state in o[pattern]) {
                var stateArray = state.split("|");
                o[pattern][state].stateArray = stateArray;
                for (var i = 0; i < stateArray.length; i++) {
                    transitions[stateArray[i]] = [];
                }
            }
        }
        for (pattern in o) {
            for (state in o[pattern]) {
                var stateArray = o[pattern][state].stateArray || [];
                for (var i = 0; i < stateArray.length; i++) {
                    var p = o[pattern][state];
                    p.action_ = [].concat(p.action_);
                    for (var k = 0; k < p.action_.length; k++) {
                        if (typeof p.action_[k] === "string") {
                            p.action_[k] = { type_: p.action_[k] };
                        }
                    }
                    var patternArray = pattern.split("|");
                    for (var j = 0; j < patternArray.length; j++) {
                        if (stateArray[i] === '*') {
                            var t = void 0;
                            for (t in transitions) {
                                transitions[t].push({ pattern: patternArray[j], task: p });
                            }
                        }
                        else {
                            transitions[stateArray[i]].push({ pattern: patternArray[j], task: p });
                        }
                    }
                }
            }
        }
        return transitions;
    }