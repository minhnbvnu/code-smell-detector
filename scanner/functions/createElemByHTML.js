function createElemByHTML(html) {
    var div = void 0;
    div = document.createElement('div');
    div.innerHTML = html;
    return div.children;
}