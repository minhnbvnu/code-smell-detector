function getWordIndex(doc, pos) {
        var textBefore = doc.getTextRange(Range.fromPoints({row: 0, column:0}, pos));
        return textBefore.split(splitRegex).length - 1;
    }