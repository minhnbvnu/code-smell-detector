function KSE_modal (modal_options) {
        var editor = editor_build();
        editor.data({'kse_sequence': [], 'kse_undefined_key': false});
        editor.data('kse_input', modal_options['input']);
        editor_update_input_group(editor);
        var modal = modal_build(editor, modal_options);

        editor.on('keydown', '.kse-input-group-input', function (evt) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });

        if (modal_options.description) {
            modal.find('.modal-body .form-group:first').html(modal_options.description);
        }

        return modal;
    }