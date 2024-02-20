function splitLinkText(text) {
    let linkText;
    let target;
    let splitIndex;

    // if a pipe is not present, we split on the first space
    splitIndex = text.indexOf('|');
    if (splitIndex === -1) {
        splitIndex = text.search(/\s/);
    } else if (text.indexOf('&lt;')) {
        splitIndex = -1;
    }

    if (splitIndex !== -1) {
        linkText = text.substr(splitIndex + 1);
        // Normalize subsequent newlines to a single space.
        linkText = linkText.replace(/\n+/, ' ');
        target = text.substr(0, splitIndex);
    }

    return {
        linkText,
        target: target || text,
    };
}