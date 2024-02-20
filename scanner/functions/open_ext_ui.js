function open_ext_ui (extension, opts) {
        var default_opts = {duration: 100};
        opts = $.extend(true, {}, default_opts, opts);

        if (extension === undefined) {
            // just make a dummy to warn about selection
            extension = {
                ui: $('<div/>')
                    .data('extension', extension)
                    .addClass('row nbext-ext-row')
                    .css('display', 'none')
                    .insertBefore('.nbext-readme'),
                selector_link: $(),
            };
            var warning = $('<div/>')
                .addClass('col-xs-12 alert alert-warning')
                .appendTo(extension.ui);
            $('<p/>')
                .text('No nbextensions match the applied filters!')
                .appendTo(warning);
        }

        /**
         * If we're in a standalone page,
         * Set window search string to allow reloading settings for a given
         * nbextension.
         * Use history.pushState if available, to avoid reloading the page
         */
        if (first_load_done && $('body').hasClass(page_class) && extension.require !== undefined) {
            var new_search = '?nbextension=' + utils.encode_uri_components(extension.require);
            if (window.history.pushState) {
                window.history.pushState(extension.require, undefined, new_search);
            }
            else {
                window.location.search = new_search;
            }
        }
        first_load_done = true;

        // ensure extension.ui exists
        if (extension.ui === undefined) {
            // use display: none since hide(0) doesn't do anything
            // for elements that aren't yet part of the DOM
            extension.ui = build_extension_ui(extension)
                .css('display', 'none')
                .insertBefore('.nbext-readme');

            var ext_enabled = extension.selector_link.find('.nbext-enable-toggle').hasClass('nbext-enabled');
            set_buttons_enabled(extension, ext_enabled);
        }

        $('.nbext-selector li')
            .removeClass('active');
        extension.selector_link.closest('li').addClass('active');

        $('.nbext-ext-row')
            .not(extension.ui)
            .slideUp(default_opts);
        extension.ui.slideDown(opts);
        load_readme(extension);
    }