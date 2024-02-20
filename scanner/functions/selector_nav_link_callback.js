function selector_nav_link_callback (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var a = $(evt.currentTarget);
        var extension = a.data('extension');
        if (a.closest('li').hasClass('disabled')) {
            return;
        }
        open_ext_ui(extension, {
            complete: function () {
                if (! $('body').hasClass(page_class)) {
                    return;
                }
                // scroll to ensure at least title is visible
                var site = $('#site');
                var title = extension.ui.children('h3:first');
                var adjust = (title.offset().top - site.offset().top) + (2 * title.outerHeight(true) - site.innerHeight());
                if (adjust > 0) {
                    site.animate({scrollTop: site.scrollTop() + adjust});
                }
            }
        });
    }