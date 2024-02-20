function attribute_detail(attr_id) {
    url = '/manage/attributes/' + attr_id + '/modal' + case_param();
    $('#modal_add_attribute_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        var editor = ace.edit("editor_detail",
            {
                autoScrollEditorIntoView: true,
                minLines: 30,
            });
        editor.setTheme("ace/theme/tomorrow");
        editor.session.setMode("ace/mode/json");
        editor.renderer.setShowGutter(true);
        editor.setOption("showLineNumbers", true);
        editor.setOption("showPrintMargin", false);
        editor.setOption("displayIndentGuides", true);
        editor.setOption("maxLines", "Infinity");
        editor.session.setUseWrapMode(true);
        editor.setOption("indentedSoftWrap", true);
        editor.renderer.setScrollMargin(8, 5)

        editor.setOptions({
          enableBasicAutocompletion: [{
            getCompletions: (editor, session, pos, prefix, callback) => {
              callback(null, [
                {value: 'mandatory', score: 1, meta: 'mandatory tag'},
                {value: 'type', score: 1, meta: 'type tag'},
                {value: 'input_string', score: 1, meta: 'An input string field type'},
                {value: 'input_checkbox', score: 1, meta: 'An input checkbox field type'},
                {value: 'input_textfield', score: 1, meta: 'An input textfield field type'},
                {value: 'input_date', score: 1, meta: 'An input date field type'},
                {value: 'input_datetime', score: 1, meta: 'An input datetime field type'},
                {value: 'input_select', score: 1, meta: 'An input select field type'},
                {value: 'raw', score: 1, meta: 'A raw field type'},
                {value: 'html', score: 1, meta: 'An html field type'},
                {value: 'value', score: 1, meta: 'default value'},
              ]);
            },
          }],
          enableLiveAutocompletion: true,
          enableSnippets: true
        });

        $('#preview_attribute').on("click", function () {
             var data_sent = Object();
            data_sent['attribute_content'] = editor.getSession().getValue();
            data_sent['csrf_token'] = $("#csrf_token").val();

            post_request_api('/manage/attributes/preview', JSON.stringify(data_sent), true)
            .done((data) => {
                if (notify_auto_api(data, true)) {
                    $('#modal_preview_attribute_content').html(data.data);

                    $('#modal_preview_attribute').modal({ show: true });
                }
            });
        });

        $('#submit_new_attribute').on("click", function () {
            update_attribute(attr_id, editor, false, false);
        })
        $('#submit_partial_overwrite').on("click", function () {
            update_attribute(attr_id, editor, true, false);
        })
        $('#submit_complete_overwrite').on("click", function () {
            update_attribute(attr_id, editor, false, true);
        })


    });
    $('#modal_add_attribute').modal({ show: true });
}