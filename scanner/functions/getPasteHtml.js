function getPasteHtml(e, filterStyle, ignoreImg) {
    var clipboardData = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData;
    var pasteText = void 0,
        pasteHtml = void 0;
    if (clipboardData == null) {
        pasteText = window.clipboardData && window.clipboardData.getData('text');
    } else {
        pasteText = clipboardData.getData('text/plain');
        pasteHtml = clipboardData.getData('text/html');
    }
    if (!pasteHtml && pasteText) {
        pasteHtml = '<p>' + replaceHtmlSymbol(pasteText) + '</p>';
    }
    if (!pasteHtml) {
        return;
    }

    // 过滤word中状态过来的无用字符
    var docSplitHtml = pasteHtml.split('</html>');
    if (docSplitHtml.length === 2) {
        pasteHtml = docSplitHtml[0];
    }

    // 过滤无用标签
    pasteHtml = pasteHtml.replace(/<(meta|script|link).+?>/igm, '');
    // 去掉注释
    pasteHtml = pasteHtml.replace(/<!--.*?-->/mg, '');
    // 过滤 data-xxx 属性
    pasteHtml = pasteHtml.replace(/\s?data-.+?=('|").+?('|")/igm, '');

    if (ignoreImg) {
        // 忽略图片
        pasteHtml = pasteHtml.replace(/<img.+?>/igm, '');
    }

    if (filterStyle) {
        // 过滤样式
        pasteHtml = pasteHtml.replace(/\s?(class|style)=('|").*?('|")/igm, '');
    } else {
        // 保留样式
        pasteHtml = pasteHtml.replace(/\s?class=('|").*?('|")/igm, '');
    }

    return pasteHtml;
}