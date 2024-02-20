function extractLeadingText(string, completeTag) {
        const tagIndex = string.indexOf(completeTag);
        let leadingText = null;
        const leadingTextRegExp = /\[(.+?)\]/g;
        let leadingTextInfo = leadingTextRegExp.exec(string);

        // did we find leading text, and if so, does it immediately precede the tag?
        while (leadingTextInfo && leadingTextInfo.length) {
            if (leadingTextInfo.index + leadingTextInfo[0].length === tagIndex) {
                string = string.replace(leadingTextInfo[0], '');
                leadingText = leadingTextInfo[1];
                break;
            }

            leadingTextInfo = leadingTextRegExp.exec(string);
        }

        return {
            leadingText,
            string,
        };
    }