function get_ioc_tag_from_data(data, classes) {
    let tag_anchor = $('<span>');
    tag_anchor.addClass(classes);
    tag_anchor.text(data);
    tag_anchor.html('<i class="fa-solid fa-virus"></i> ' + tag_anchor.html());

    return tag_anchor.prop('outerHTML');
}