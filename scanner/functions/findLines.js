function findLines(gc, config, words, width) {

    if (words.length === 1) {
        return words;
    }

    // starting with just the first word...
    var stillFits, line = [words.shift()];
    while (
        // so lone as line still fits within current column...
    (stillFits = gc.getTextWidth(line.join(' ')) < width)
    // ...AND there are more words available...
    && words.length
        ) {
        // ...add another word to end of line and retest
        line.push(words.shift());
    }

    if (
        !stillFits // if line is now too long...
        && line.length > 1 // ...AND is multiple words...
    ) {
        words.unshift(line.pop()); // ...back off by (i.e., remove) one word
    }

    line = [line.join(' ')];

    if (words.length) { // if there's anything left...
        line = line.concat(findLines(gc, config, words, width)); // ...break it up as well
    }

    return line;
}