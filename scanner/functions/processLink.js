function processLink(string, tagInfo) {
        const leading = extractLeadingText(string, tagInfo.completeTag);
        let linkText = leading.leadingText;

        string = leading.string;

        const split = splitLinkText(tagInfo.text);
        const target = split.target;
        linkText = linkText || split.linkText;

        const monospace = useMonospace(tagInfo.tag, tagInfo.text);

        return string.replace(tagInfo.completeTag, buildLink(target, linkText, {
            linkMap: longnameToUrl,
            monospace,
            shortenName: shouldShortenLongname(),
        }));
    }