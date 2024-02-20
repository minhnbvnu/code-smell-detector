function fixCurrentKeys(keyChar, keydown) {
    var index = this.currentKeys.indexOf(keyChar);

    if (!keydown && index >= 0) {
        this.currentKeys.splice(index, 1);
    }

    if (keyChar === 'SHIFT') {
        // on keydown, replace unshifted keys with shifted keys
        // on keyup, vice-versa
        this.currentKeys.forEach(function(key, index, currentKeys) {
            var pair = charMap.find(function(pair) {
                return pair[keydown ? 0 : 1] === key;
            });
            if (pair) {
                currentKeys[index] = pair[keydown ? 1 : 0];
            }
        });
    }

    if (keydown && index < 0) {
        this.currentKeys.push(keyChar);
    }
}