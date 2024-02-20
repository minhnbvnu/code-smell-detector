function filter_build_tag_element (tag_object) {
        var tag_elem = $('<div>')
            .data('nbext_tag_object', tag_object)
            .addClass('nbext-filter-tag btn-group');
        $('<span/>')
            .text(tag_object.label)
            .appendTo(tag_elem);
        $('<span/>')
            .on('click', function (evt) {
                evt.preventDefault();
                tag_elem.remove();
                filter_callback_queue_refresh();
            })
            .append('<i class="fa fa-close">')
            .appendTo(tag_elem);
        return tag_elem;
    }