function pickState(state){void 0===state&&(state={});var result={};return stateKeys.forEach((function(k){state.hasOwnProperty(k)&&(result[k]=state[k])})),result}