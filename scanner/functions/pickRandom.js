function pickRandom(arr) {
        var r = Math.random();
        return arr[parseInt(r*arr.length)];
    }