function toggleList(toggle, content, maxItems) {
    if (toggle.css('display') == 'none') {
        vOffset = vOffset_init;
        toggle.removeClass(c);
        content.show();
        return;
    } else
        vOffset = 8;

    if (maxItems > content.children().length)
        return;
    content.hide();
    toggle.addClass(c);
}