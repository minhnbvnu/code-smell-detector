function build_extension_list (extension_list) {
        // add enabled-but-unconfigurable nbextensions to the list
        // construct a set of enabled nbextension urls from the configs
        // this is used later to add unconfigurable nbextensions to the list
        var unconfigurable_enabled_extensions = {};
        var section;
        for (section in configs) {
            unconfigurable_enabled_extensions[section] = $.extend({}, configs[section].data.load_extensions);
        }
        var i, extension;
        for (i = 0; i < extension_list.length; i++) {
            extension = extension_list[i];
            extension.Section = (extension.Section || 'notebook').toString();
            extension.Name = (extension.Name || (extension.Section + ':' + extension.require)).toString();
            // nbextension *is* configurable
            delete unconfigurable_enabled_extensions[extension.Section][extension.require];
        }
        // add any remaining unconfigurable nbextensions as stubs
        for (section in configs) {
            for (var require_url in unconfigurable_enabled_extensions[section]) {
                var word = unconfigurable_enabled_extensions[section][require_url] ? 'enabled' : 'disabled';
                extension_list.push({
                    Name: require_url,
                    Description: 'This nbextension is ' + word + ' in the ' + section + ' json config, ' +
                        "but doesn't provide a yaml file to tell us how to configure it. " +
                        "You can still enable or disable it from here, though.",
                    Section: section,
                    require: require_url,
                    unconfigurable: true,
                });
            }
        }

        var selector_nav = $('.nbext-selector ul');

        // sort nbextensions alphabetically
        extension_list.sort(function (a, b) {
            var an = (a.Name || '').toLowerCase();
            var bn = (b.Name || '').toLowerCase();
            if (an < bn) return -1;
            if (an > bn) return 1;
            return 0;
        });

        // fill the selector with nav links
        for (i = 0; i < extension_list.length; i++) {
            extension = extension_list[i];
            extensions_dict[extension.require] = extension;
            console.log(log_prefix, 'Found nbextension', extension.require);

            extension.is_compatible = (extension.Compatibility || '?.x').toLowerCase().indexOf(
                ((typeof sys_info === 'undefined') ? Jupyter.version : sys_info.notebook_version).substring(0, 2) + 'x') >= 0;
            extension.Parameters = extension.Parameters || [];
            if (!extension.is_compatible) {
                // reveal the checkbox since we've found an incompatible nbext
                $('.nbext-showhide-incompat').show();
            }
            extension.selector_link = $('<a/>')
                .attr('href', '#')
                .data('extension', extension)
                .html(extension.Name)
                .toggleClass('text-warning bg-warning', extension.unconfigurable === true)
                .prepend(
                    $('<i>')
                        .addClass('fa fa-fw nbext-enable-toggle')
                );
            $('<li/>')
                .addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12')
                .toggleClass('nbext-incompatible', !extension.is_compatible)
                .append(extension.selector_link)
                .appendTo(selector_nav);

            var ext_enabled = false;
            var conf = configs[extension.Section];
            if (conf === undefined) {
                console.warn(log_prefix, extension.require,
                    "specifies unknown Section of '" + extension.Section + "'. Can't determine enable status.");
            }
            else if (conf.data.hasOwnProperty('load_extensions')) {
                ext_enabled = (conf.data.load_extensions[extension.require] === true);
            }
            set_buttons_enabled(extension, ext_enabled);

            filter_register_new_tag({category: 'section', value: extension.Section});
            extension.tags = (extension.tags || []);
            for (var tt=0; tt < extension.tags.length; tt++) {
                filter_register_new_tag({category: 'tag', value: extension.tags[tt]});
            }
            extension.filter_txt = (extension.Description + ' ' + extension.Name).toLowerCase();
        }
        // sort tags
        tags.sort(function (a, b) {
            var cat_order = ['section', 'tag'];
            var an = cat_order.indexOf(a.category);
            var bn = cat_order.indexOf(b.category);
            if (an != bn) {
                return an - bn;
            }
            an = (a.label  || '').toLowerCase();
            bn = (b.label  || '').toLowerCase();
            if (an < bn) return -1;
            if (an > bn) return 1;
            return 0;
        });

        // attach click handlers
        $('.nbext-enable-toggle')
            .on('click', selector_checkbox_callback)
            .closest('a')
            .on('click', selector_nav_link_callback);

        // en/disable incompatible nbextensions
        var hide_incompat = true;
        if (configs.common.data.hasOwnProperty('nbext_hide_incompat')) {
            hide_incompat = configs.common.data.nbext_hide_incompat;
            console.log(log_prefix,
                'nbext_hide_incompat loaded from config as: ',
                hide_incompat
            );
        }
        set_hide_incompat(hide_incompat);

        // select a link
        selector_nav.children('li:not(.disabled)').last().children('a').click();
    }