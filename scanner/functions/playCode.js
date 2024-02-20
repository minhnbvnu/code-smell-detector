function playCode(code) {
        code = code.split("\n").map(function(line) {
            return line.replace(/([\d\D])?\/\/[\d\D]*$/, function(m, a, b) {
                return (a === ":") ? m : ""; // url??
            });
        }).join("\n");
        if (timbre.isPlaying && nowPlaying === code) {
            timbre.reset();
            timbre.pause();
        } else {
            timbre.reset();
            eval(code);
            nowPlaying = code;
        }
    }