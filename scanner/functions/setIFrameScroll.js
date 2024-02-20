function setIFrameScroll(iframe, x, y) {
    const html = iframe.contentWindow.document.getElementsByTagName('html')[0];
    html.scrollLeft = x;
    html.scrollTop = y;
}