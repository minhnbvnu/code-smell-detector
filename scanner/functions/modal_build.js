function modal_build (editor, modal_options) {
        var modal = $('#kse-editor-modal');
        if (modal.length > 0) {
            return modal;
        }

        var default_modal_options = {
            'destroy': false,
            'show': false,
            'title': 'Edit keyboard shortcut',
            'body': editor,
            'buttons': {
                'OK': {'class': 'btn-primary'},
                'Cancel': {}
            },
            'open': function (evt) {
                $(this).find('.kse-input-group-input').focus();
            }
        };
        if (Jupyter.notebook !== undefined) {
            default_modal_options.notebook = Jupyter.notebook;
        }
        if (Jupyter.keyboard_manager !== undefined) {
            default_modal_options.keyboard_manager= Jupyter.keyboard_manager;
        }
        modal_options = $.extend({}, default_modal_options, modal_options);

        modal = dialog.modal(modal_options);

        modal
            .addClass('modal_stretch')
            .attr('id', 'kse-editor-modal');

        // Add a data-target attribute to ensure buttons only target the editor modal
        modal.find('.close,.modal-footer button')
            .attr('data-target', '#kse-editor-modal');

        return modal;
    }