function get_showdown_convert() {
    return new showdown.Converter({
        tables: true,
        parseImgDimensions: true,
        emoji: true,
        smoothLivePreview: true,
        strikethrough: true,
        tasklists: true,
        ghCodeBlocks: true,
        backslashEscapesHTMLTags: true,
        splitAdjacentBlockquotes: true,
        extensions: [createSanitizeExtensionForImg, 'bootstrap-tables']
    });
}