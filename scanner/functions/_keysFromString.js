function _keysFromString(combination) {
        var keys = combination.split('+');
        if (combination[combination.length-1] === '+') {
            keys.pop();
            if (keys.length) keys.pop();
            keys.push('+');
        }

        return keys;
    }