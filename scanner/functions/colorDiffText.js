function colorDiffText(diff) {
    var objects = map(diff, function(part) {
        var text = part.value;
        if (part.added) {
            text = color.green(text);
        } else if (part.removed) {
            text = color.red(text);
        }
        if (diff.length === 2) {
            text += " "; // format simple diffs
        }
        return text;
    });
    return join(objects, "");
}