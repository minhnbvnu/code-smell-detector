function get_tag_from_data(data, classes) {
    if (data === undefined || data === null || data.length === 0) {
        return '';
    }
    let tag_anchor = $('<span>');
    tag_anchor.addClass(classes);
    tag_anchor.text(data);
    tag_anchor.html('<i class="fa-solid fa-tag mr-1"></i> ' + tag_anchor.html());

    return tag_anchor.prop('outerHTML');
}