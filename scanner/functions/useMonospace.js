function useMonospace(tag, text) {
    let cleverLinks;
    let monospaceLinks;
    let result;

    if (hasUrlPrefix(text)) {
        result = false;
    } else if (tag === 'linkplain') {
        result = false;
    } else if (tag === 'linkcode') {
        result = true;
    } else {
        cleverLinks = env.conf.templates.cleverLinks;
        monospaceLinks = env.conf.templates.monospaceLinks;

        if (monospaceLinks || cleverLinks) {
            result = true;
        }
    }

    return result || false;
}