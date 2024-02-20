function getIndentDescription(indentStyle, level) {
    // If either user has specified 0 indent or we're at level 0 (start), totalIndent becomes 0.
    const totalIndent = indentStyle.length * level, s = totalIndent > 1 ? "s" : "";

    // If style is that there should be no indent for any level OR we're at base level
    if (totalIndent === 0) {
        return "0 whitespace";
    }

    if (indentStyle [0] === " ") {
        return `${totalIndent} space${s}`;
    }

    // If above 2 are bypassed, indent style must be tab(s)
    return `${totalIndent} tab${s}`;
}