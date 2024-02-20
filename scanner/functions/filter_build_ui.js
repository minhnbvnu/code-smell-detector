function filter_build_ui () {
        // define a custom jqueryui autocomplete widget
        $.widget('custom.nbextfilterer', $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu('option', 'items', '> :not(.nbext-filter-category)');
            },
            _renderMenu: function (ul, items) {
                ul.addClass('nbext-filter-menu dropdown-menu');
                ul.removeClass('ui-menu ui-autocomplete ui-front ui-widget ui-widget-content ui-corner-all');
                var nbextfiltererwidget = this;
                // leave already-applied tags out of the menu
                var active_tag_labels = $.map(
                    $(this.element).siblings('.nbext-filter-tag'),
                    function (elem, idx) {
                        return $(elem).data('nbext_tag_object').label;
                    }
                );
                $.each(items, function (index, item) {
                    if (active_tag_labels.indexOf(item.label) < 0) {
                        nbextfiltererwidget._renderItemData(ul, item);
                    }
                });
            }
        });

        var filter_input_group = $('<div/>')
            .attr('id', 'nbext-filter-grp')
            .addClass('nbext-filter-grp input-group');
        $('<span/>')
            .attr('id', 'nbext-filter-label')
            .addClass('nbext-filter-label input-group-addon')
            .appendTo(filter_input_group);
        // add a wrapper to hold both applied tags and an input.
        // It will be styled to look like an input using the form-control css class.
        var filter_input_wrap = $('<div/>')
            .addClass('nbext-filter-input-wrap form-control')
            .attr('aria-describedby', 'nbext-filter-label')
            .on('click', function (evt) {
                if (evt.target == this) { //only if we clicked the div, not a child of it
                    var input = $(this).find('input').first();
                    input.focus();
                    input.data('custom-nbextfilterer').search(input[0].value);
                }
            }).appendTo(filter_input_group);

        var input_sub_wrap = $('<div>')
            .addClass('nbext-filter-input-subwrap')
            .appendTo(filter_input_wrap);

        // add the actual input
        $('<input />')
            .attr('placeholder', 'by description, section, or tags')
            .on('focus', function (evt) {
                $(this).data('custom-nbextfilterer').search(this.value);
            })
            // register an extra keydown handler for stuff where we want to
            // override default autocomplete behaviour
            .on('change keyup paste mouseup', function (evt) {
                var lastvalue;
                var $this = $(this);
                if (evt.keyCode === $.ui.keyCode.TAB) {
                    // don't navigate away from the field on tab when selecting an item
                    var menu_active = $this.data('custom-nbextfilterer').menu.active;
                    if (menu_active) {
                        evt.preventDefault();
                    }
                    filter_callback_queue_refresh();
                }
                else if (evt.keyCode === $.ui.keyCode.BACKSPACE && !this.value) {
                    filter_input_wrap.children('.nbext-filter-tag').last().remove();
                    filter_callback_queue_refresh();
                }
                else if (this.value !== lastvalue) {
                    filter_callback_queue_refresh();
                }

                // update visibilty of clear control
                if (this.value || filter_input_wrap.children('.nbext-filter-tag:first-child').length > 0) {
                    input_sub_wrap.children('.fa').show();
                }
                else {
                    input_sub_wrap.children('.fa').hide();
                }
            })
            .nbextfilterer({
                delay: 20,
                source: tags,
                minLength: 0,
                autoFocus: true,
                focus: function() {
                    return false; // prevent value inserted on focus
                },
                select: function(event, ui) {
                    // add the selected item (tag)
                    filter_build_tag_element(ui.item).insertBefore($(this).parent());
                    // clear input
                    this.value = '';
                    // queue updating filter
                    filter_callback_queue_refresh();
                    return false;
                }
            })
            .appendTo(input_sub_wrap);

        $('<span>')
            .addClass('fa fa-remove')
            .attr('title', 'clear filter')
            .on('click', function (evt) {
                filter_input_wrap.children('.nbext-filter-tag').remove();
                filter_input_wrap.find('input')[0].value = '';
                filter_callback_queue_refresh();
            })
            .appendTo(input_sub_wrap);

        return filter_input_group;
    }