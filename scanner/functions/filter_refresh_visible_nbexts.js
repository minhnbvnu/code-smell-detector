function filter_refresh_visible_nbexts () {
        var to_show = [], to_hide = [];
        var active_tags = $('.nbext-filter-tag').map(function (idx, tag_elem) {
            return $(tag_elem).data('nbext_tag_object');
        });
        var remaining_text = $('.nbext-filter-input-wrap input')[0].value;
        $('.nbext-selector ul li a').each(function (idx, el) {
            var ext = $(el).data('extension');
            var show = true;
            var ii;
            for (ii = 0; ii < active_tags.length && show; ii++) {
                var tag = active_tags[ii];
                switch (tag.category) {
                    case 'section':
                        show = show && (tag.value === ext.Section);
                        break;
                    case 'tag':
                        show = show && (ext.tags.indexOf(tag.value) >= 0);
                        break;
                }
            }
            var words = remaining_text.split(/\s+/);
            for (ii = 0; show && ii < words.length; ii++) {
                show = show && ext.filter_txt.indexOf(words[ii]) >= 0;
            }
            (show ? to_show: to_hide).push(ext.selector_link.parent()[0]);
        });
        $(to_hide).slideUp(100);
        to_show = $(to_show); // convert to jquery obj
        to_show.slideDown(100);
        // make sure a visible nbextensions is selected
        if (!to_show.is('.active')) {
            var candidate = to_show.filter(':not(.disabled)').first().children('a');
            if (candidate.length > 0 ) {
                candidate.click();
            }
            else {
                open_ext_ui(undefined);
            }
        }
        filter_timeout_id = null;
    }