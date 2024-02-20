function edit_task(id) {
  url = '/case/tasks/'+ id + '/modal' + case_param();
  $('#modal_add_task_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        g_task_id = id;

        g_task_desc_editor = get_new_ace_editor('task_description', 'task_desc_content', 'target_task_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null);

        g_task_desc_editor.setOption("minLines", "6");
        preview_task_description(true);

        headers = get_editor_headers('g_task_desc_editor', null, 'task_edition_btn');
        $('#task_edition_btn').append(headers);

        load_menu_mod_options_modal(id, 'task', $("#task_modal_quick_actions"));
        $('#modal_add_task').modal({show:true});
        edit_in_task_desc();
  });
}