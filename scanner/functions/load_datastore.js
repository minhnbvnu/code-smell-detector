function load_datastore() {

    ds_filter = ace.edit("ds_file_search",
    {
        autoScrollEditorIntoView: true,
        minLines: 1,
        maxLines: 5
    });
    ds_filter.setTheme("ace/theme/tomorrow");
    ds_filter.session.setMode("ace/mode/json");
    ds_filter.renderer.setShowGutter(false);
    ds_filter.setShowPrintMargin(false);
    ds_filter.renderer.setScrollMargin(10, 10);
    ds_filter.setOption("displayIndentGuides", true);
    ds_filter.setOption("indentedSoftWrap", true);
    ds_filter.setOption("showLineNumbers", false);
    ds_filter.setOption("placeholder", "Search files");
    ds_filter.setOption("highlightActiveLine", false);
    ds_filter.commands.addCommand({
            name: "Do filter",
            bindKey: { win: "Enter", mac: "Enter" },
            exec: function (editor) {
                      filter_ds_files();
            }
    });

    get_request_api('/datastore/list/tree')
    .done(function (data){
        if(notify_auto_api(data, true)){
            $('#ds-tree-root').empty();
            build_ds_tree(data.data, 'ds-tree-root');
            reparse_activate_tree();
            show_datastore();
        }
    });
}