function extractDirectiveComment(value) {
        const match = /\s-{2,}\s/u.exec(value);
        if (!match) {
            return { directivePart: value.trim(), justificationPart: "" };
        }
        const directive = value.slice(0, match.index).trim();
        const justification = value.slice(match.index + match[0].length).trim();
        return { directivePart: directive, justificationPart: justification };
    }