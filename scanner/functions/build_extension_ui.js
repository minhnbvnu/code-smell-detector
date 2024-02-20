function build_extension_ui (extension) {
        var ext_row = $('<div/>')
            .data('extension', extension)
            .addClass('row nbext-ext-row');

        try {
            /**
             * Name.
             * Take advantage of column wrapping by using the col-xs-12 class
             * to ensure the name takes up a whole row-width on its own,
             * so that the subsequent columns wrap onto a new line.
             */
            $('<h3>')
                .addClass('col-xs-12')
                .html(extension.Name)
                .appendTo(ext_row);

            /**
             * Columns
             */
            var col_left = $('<div/>')
                .addClass('col-xs-12')
                .appendTo(ext_row);

            // Icon
            if (extension.icon) {
                col_left
                    .addClass('col-sm-8 col-sm-pull-4 col-md-6 col-md-pull-6');
                // right precedes left in markup, so that it appears first when
                // the columns are wrapped each onto a single line.
                // The push and pull CSS classes are then used to get them to
                // be left/right correctly when next to each other
                var col_right = $('<div>')
                    .addClass('col-xs-12 col-sm-4 col-sm-push-8 col-md-6 col-md-push-6')
                    .insertBefore(col_left);
                $('<div/>')
                    .addClass('nbext-icon')
                    .append(
                        $('<img>')
                            .attr({
                                // extension.icon is in nbextensions namespace
                                'src': utils.url_path_join(base_url, 'nbextensions', utils.encode_uri_components(extension.icon)),
                                'alt': extension.Name + ' icon'
                            })
                    )
                    .appendTo(col_right);
            }

            // Duplicate warning
            if (extension.duplicate) {
                var duplicate_warning_p = $('<p/>').text([
                    'This nbextension\'s require url (' + extension.require + ')',
                    'is referenced by two different yaml files on the server.',
                    'This probably means that there are two installations of the',
                    'same nbextension in different directories on the server.',
                    'If they are different, only one will be loaded by the',
                    'notebook, and this may prevent configuration from working',
                    'correctly.',
                    'Check the jupyter notebook server log for the paths of',
                    'the relevant yaml files.'].join(' '));
                $('<div/>')
                    .addClass('col-xs-12 alert alert-warning')
                    .css('margin-top', '5px')
                    .append(duplicate_warning_p)
                    .appendTo(ext_row);
            }

            // Description
            var div_desc = $('<div/>')
                .addClass('nbext-desc')
                .appendTo(col_left);
            if (extension.hasOwnProperty('Description')) {
                rendermd.render_markdown(extension.Description)
                    .addClass('rendered_html')
                    .appendTo(div_desc);
            }

            // Section
            $('<div/>')
                .text('section: ' + extension.Section)
                .appendTo(col_left);

            // Require
            $('<div/>')
                .text('require path: ')
                .append(
                    $('<span/>').addClass('rendered_html').append(
                        $('<code/>').text(extension.require)))
                .appendTo(col_left);

            // Compatibility
            var compat_txt = extension.Compatibility || '?.x';
            var compat_idx = compat_txt.toLowerCase().indexOf(
                ((typeof sys_info === 'undefined') ? Jupyter.version : sys_info.notebook_version).substring(0, 2) + 'x');
            if (!extension.is_compatible) {
                ext_row.addClass('nbext-incompatible');
                compat_txt = $('<span/>')
                    .addClass('bg-danger text-danger')
                    .text(compat_txt);
            }
            else {
                compat_txt = $('<span/>')
                    .append(
                        compat_txt.substring(0, compat_idx)
                    )
                    .append(
                        $('<span/>')
                            .addClass('bg-success text-success')
                            .text(compat_txt.substring(compat_idx, compat_idx + 3))
                    )
                    .append(compat_txt.substring(compat_idx + 3, compat_txt.length));
            }
            $('<div/>')
                .addClass('nbext-compat-div')
                .text('compatibility: ')
                .append(compat_txt)
                .appendTo(col_left);

            // Enable/Disable buttons
            build_enable_buttons().appendTo(col_left);

            // Parameters
            if (extension.Parameters.length > 0) {
                for (var ii = 0; ii < extension.Parameters.length; ii++) {
                    extension.Parameters[ii].section = extension.Section;
                }
                var reset_control = $('<a/>')
                    .on('click', reset_params_callback)
                    .addClass('pull-right')
                    .attr({
                        href: '#',
                        title:'reset parameters to defaults',
                    })
                    .text(' reset');
                $('<i/>')
                    .addClass('fa fa-refresh')
                    .addClass()
                    .prependTo(reset_control);
                $('<div/>')
                    .addClass('panel panel-default nbext-params col-xs-12')
                    .append(
                        $('<div/>')
                            .addClass('panel-heading')
                            .text('Parameters')
                            .prepend('<i class="fa fa-fw fa-caret-down"/>')
                            .on('click', panel_showhide_callback)
                            .append(reset_control)
                    )
                    .append(
                        build_params_ui(extension.Parameters)
                    )
                    .appendTo(ext_row);
            }
        }
        catch (err) {
            var msg = log_prefix + ' error loading ' + extension.require;
            console.error(msg + ':\n' + err);
            $('<div/>')
                .addClass('col-xs-12 alert alert-warning')
                .css('margin-top', '5px')
                .append($('<p/>').text(msg))
                .appendTo(ext_row);
        }
        finally {
            return ext_row;
        }
    }