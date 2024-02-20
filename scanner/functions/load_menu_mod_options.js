function load_menu_mod_options(data_type, table, deletion_fn) {
    var actionOptions = {
        classes: [],
        contextMenu: {
            enabled: true,
            isMulti: true,
            xoffset: -10,
            yoffset: -10,
            headerRenderer: function (rows) {
                if (rows.length > 1) {
                    return rows.length + ' items selected';
                } else {
                    let row = rows[0];
                    return 'Quick action';
                }
            },
        },
        buttonList: {
            enabled: false,
        },
        deselectAfterAction: true,
        items: [],
    };

    datatype_map = {
        'task': 'tasks',
        'ioc': 'ioc',
        'evidence': 'evidences',
        'note': 'notes',
        'asset': 'assets',
        'event': 'timeline/events'
    }

    get_request_api("/dim/hooks/options/"+ data_type +"/list")
    .done((data) => {
        if(notify_auto_api(data, true)) {
            if (data.data != null) {
                jsdata = data.data;

                actionOptions.items.push({
                    type: 'option',
                    title: 'Share',
                    multi: false,
                    iconClass: 'fas fa-share',
                    action: function(rows){
                        row = rows[0];
                        copy_object_link(get_row_id(row));
                    }
                });

                actionOptions.items.push({
                    type: 'option',
                    title: 'Comment',
                    multi: false,
                    iconClass: 'fas fa-comments',
                    action: function(rows){
                        row = rows[0];
                        if (data_type in datatype_map) {
                            comment_element(get_row_id(row), datatype_map[data_type]);
                        }
                    }
                });

                actionOptions.items.push({
                    type: 'option',
                    title: 'Markdown Link',
                    multi: false,
                    iconClass: 'fa-brands fa-markdown',
                    action: function(rows){
                        row = rows[0];
                        copy_object_link_md(data_type, get_row_id(row));
                    }
                });

                actionOptions.items.push({
                    type: 'option',
                    title: 'Copy',
                    multi: false,
                    iconClass: 'fa-regular fa-copy',
                    action: function(rows){
                        row = rows[0];
                        copy_text_clipboard(get_row_value(row));
                    }
                });

                actionOptions.items.push({
                    type: 'divider'
                });
                jdata_menu_options = jsdata;

                for (option in jsdata) {
                    opt = jsdata[option];

                    actionOptions.items.push({
                        type: 'option',
                        title: opt.manual_hook_ui_name,
                        multi: true,
                        multiTitle: opt.manual_hook_ui_name,
                        iconClass: 'fas fa-rocket',
                        contextMenuClasses: ['text-dark'],
                        action: function (rows, de, ke) {
                            init_module_processing_wrap(rows, data_type, de[0].outerText);
                        },
                    })
                }

                if (deletion_fn !== undefined) {
                    actionOptions.items.push({
                        type: 'divider',
                    });

                    actionOptions.items.push({
                        type: 'option',
                        title: 'Delete',
                        multi: false,
                        iconClass: 'fas fa-trash',
                        contextMenuClasses: ['text-danger'],
                        action: function(rows){
                            row = rows[0];
                            deletion_fn(get_row_id(row));
                        }
                    });
                }

                tableActions = table.contextualActions(actionOptions);
                tableActions.update();
            }
        }
    })
}