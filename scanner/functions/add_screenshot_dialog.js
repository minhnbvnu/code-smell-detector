function add_screenshot_dialog(e) {
    var dialog = $("#dialog-add-screenshot").closest(".ui-dialog");
    var form = dialog.find("form");
    file_upload_dialog(e);
    var btn = $('<button id="get_ss_ids">Copy IDs</button>');
    if ($('#get_ss_ids').length < 1) {
        $('#form-add-screenshot').find('#id_screenshot_ids').after(btn);
    }

    $(document).on('click', '#get_ss_ids', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var sids = readCookie('screenshot_ids');
        $('#id_screenshot_ids').val(sids);
    });

    $('.screenshot-submit-iframe').load(function(e) {
        var $curTar = $(e.currentTarget);
        var response = strip(this.contentDocument.body.innerHTML);
        if (!response) {
            return;
        }
        try {
            response = $.parseJSON(response);
        } catch (err) {
            response = {'message': 'Error uploading file.', 'success': false}
        }

        this.contentDocument.body.innerText = '';

        var dialog = $curTar.closest(".ui-dialog");
        dialog.find(".message").text(response.message).show();
        if (response.html) {
            // don't add it again if it's already on the page
            if ($('a[data-id="' + response.id + '"]').length < 1) {
                $('div#links').append(response.html);
            };
        }
    });
}