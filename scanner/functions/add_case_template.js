function add_case_template() {
    let url = '/manage/case-templates/add/modal' + case_param();
    $('#modal_case_template_json').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        let editor = ace.edit("editor_detail",
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
                {value: 'name', score: 1, meta: 'name of the template'},
                {value: 'display', score: 1, meta: 'display name of the template'},
                {value: 'description', score: 1, meta: 'description of the template'},
                {value: 'author', score: 1, meta: 'author of the template'},
                {value: 'title_prefix', score: 1, meta: 'prefix of instantiated cases'},
                {value: 'summary', score: 1, meta: 'summary of the case'},
                {value: 'tags', score: 1, meta: 'tags of the case or the tasks'},
                {value: 'tasks', score: 1, meta: 'tasks of the case'},
                {value: 'note_groups', score: 1, meta: 'groups of notes'},
                {value: 'title', score: 1, meta: 'title of the task or the note group or the note'},
                {value: 'content', score: 1, meta: 'content of the note'},
              ]);
            },
          }],
          enableLiveAutocompletion: true,
          enableSnippets: true
        });

        $('#submit_new_case_template').on("click", function () {
            let data_sent = Object();
            data_sent['case_template_json'] = editor.getSession().getValue();
            data_sent['csrf_token'] = $("#csrf_token").val();

            post_request_api('/manage/case-templates/add', JSON.stringify(data_sent), false, function() {
                window.swal({
                      title: "Adding...",
                      text: "Please wait",
                      icon: "/static/assets/img/loader.gif",
                      button: false,
                      allowOutsideClick: false
                });
            })
            .done((data) => {
                if (notify_auto_api(data)) {
                    refresh_case_template_table();
                    $('#modal_case_template').modal('hide');
                }
            })
            .fail((error) => {
                let data = error.responseJSON;
                $('#submit_new_case_template').text('Save');
                $('#alert_case_template_edit').text(data.message);
                if (data.data && data.data.length > 0) {

                    let output='<li>'+ sanitizeHTML(data.data) +'</li>';
                    $('#case_template_err_details_list').append(output);

                    $('#alert_case_template_details').show();
                }
                $('#alert_case_template_edit').show();
            })
            .always((data) => {
                window.swal.close();
            });

            return false;
        })
    });
    $('#modal_case_template').modal({ show: true });
}