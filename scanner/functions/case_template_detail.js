function case_template_detail(ctempl_id) {
    let url = '/manage/case-templates/' + ctempl_id + '/modal' + case_param();
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
                {value: 'display_name', score: 1, meta: 'display name of the template'},
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
            update_case_template(ctempl_id, editor, false, false);
        });

        $('#submit_delete_case_template').on("click", function () {
            delete_case_template(ctempl_id);
        });
    });
    $('#modal_case_template').modal({ show: true });
}