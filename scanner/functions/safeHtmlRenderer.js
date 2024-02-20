function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
    const escaped = escapeHTML(value)
    const url = escapeHTML(initialData[row]["URL"])
    td.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${escaped}</a>`;
    return td;
}