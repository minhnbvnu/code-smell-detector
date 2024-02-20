function editor_update_input_group (editor, seq) {
        seq = seq || editor.data('kse_sequence');
        var shortcut = seq.join(',');
        var mode = editor.data('kse_mode');
        var have_seq = seq.length > 0;
        var valid = have_seq;

        // empty help block
        var feedback = editor.find('.form-group.has-feedback:first');
        var help_block = feedback.find('.help-block');
        help_block.empty();

        var ii;
        var has_comma = false;
        for (ii = 0; !has_comma && (ii < seq.length); ii++) {
            has_comma = seq[ii].indexOf(',') >= 0;
        }

        if (has_comma) {
            valid = false;
            // use HTML Unicode escape for a comma, to get it to look right in the pretty version
            shortcut = $.map(seq, function (elem, idx) {
                return elem.replace(',', '&#44;');
            }).join(',');

            $('<p/>')
                .html(
                    'Unfortunately, Jupyter\'s handling of shortcuts containing ' +
                    'commas (<kbd>,</kbd>) is fundamentally flawed, ' +
                    'as the comma is used as the key-separator character &#9785;. ' +
                    'Please try something else for your rebind!'
                )
                .appendTo(help_block);
        }
        else if (have_seq) {
            var conflicts = {};
            var tree;

            // get existing shortcuts
            if (Jupyter.keyboard_manager !== undefined) {
                var startkey = seq.slice(0, 1)[0];
                if (mode === 'command') {
                    tree = Jupyter.keyboard_manager.command_shortcuts.get_shortcut(startkey);
                }
                else {
                    tree = Jupyter.keyboard_manager.edit_shortcuts.get_shortcut(startkey);
                    // deal with codemirror shortcuts specially, since they're not included in kbm
                    for (var jj = 0; jj < quickhelp.cm_shortcuts.length; jj++) {
                        var cm_shrt = quickhelp.cm_shortcuts[jj];
                        if (keyboard.normalize_shortcut(cm_shrt.shortcut) === startkey) {
                            tree = cm_shrt.help;
                            break;
                        }
                    }
                }
            }

            // check for conflicting shortcuts.
            // Start at 1 because we got tree from startkey
            for (ii = 1; (ii < seq.length) && (tree !== undefined); ii++) {
                // check for exsiting definitions at current specificity
                if (typeof(tree) === 'string') {
                    valid = false;
                    conflicts[seq.slice(0, ii).join(',')] = tree;
                    break;
                }
                tree = tree[seq[ii]];
            }
            
            // check whether any more-specific shortcuts were defined
            if ((ii === seq.length) && (tree !== undefined)) {
                valid = false;
                var flatten_conflict_tree = function flatten_conflict_tree (obj, key) {
                    if (typeof(obj) === 'string') {
                        conflicts[key] = obj;
                    }
                    else for (var subkey in obj) {
                        if (obj.hasOwnProperty(subkey)) {
                            flatten_conflict_tree(obj[key], [key, subkey].join(','));
                        }
                    }
                };
                flatten_conflict_tree(tree, seq.join(','));
            }

            if (!valid) {
                var plural = Object.keys(conflicts).length != 1;
                $('<p/>')
                    .append(quickhelp.humanize_sequence(seq.join(',')))
                    .append(
                        ' conflicts with the' + (plural ? ' following' : '') +
                        ' existing shortcut' + (plural ? 's' : '') + ':'
                    )
                    .appendTo(help_block);

                for (var conflicting_shortcut in conflicts) {
                    if (conflicts.hasOwnProperty(conflicting_shortcut)) {
                        $('<p/>')
                            .append(quickhelp.humanize_sequence(conflicting_shortcut))
                            .append($('<code/>').text(conflicts[conflicting_shortcut]))
                            .appendTo(help_block);
                    }
                }
            }
        }

        if (editor.data('kse_undefined_key')) {
            var warning = $('<span/>')
                .addClass('form-group has-feedback has-warning kse-undefined')
                .append(
                    $('<span/>')
                        .addClass('help-block')
                        .append(
                            $('<p/>').text('Unrecognised key! (code ' + editor.data('kse_undefined_key' ) + ')')
                        )
                );

            var existing = editor.find('.kse-undefined');
            if (existing.length > 0) {
                existing.replaceWith(warning);
            }
            else {
                warning.insertAfter(feedback);
            }
            setTimeout(function () {
                warning.remove();
            }, 2000);
        }

        // disable reset button if no sequence
        editor.find('.kse-input-group-reset')
            .toggleClass('disabled', !have_seq);

        editor.find('.kse-input-group-pretty')
            .html(shortcut ? quickhelp.humanize_sequence(shortcut) : '&lt;new shortcut&gt;');

        feedback
            .toggleClass('has-error', !valid && have_seq)
            .toggleClass('has-success', valid && have_seq)
            .find('.form-control-feedback .fa')
                .toggleClass('fa-remove', !valid && have_seq)
                .toggleClass('fa-check', valid && have_seq);
    }