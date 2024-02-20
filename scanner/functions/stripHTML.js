function stripHTML(html) {
    return html.replace(/<[^>]*>/g, '');
}