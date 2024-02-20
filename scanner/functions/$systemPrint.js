function $systemPrint(m, style) {
    $outputAppend('<i' + (style ? ' style="' + style + '">' : '>') + escapeHTMLEntities(m) + '</i>\n');
}