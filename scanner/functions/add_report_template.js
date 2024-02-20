function add_report_template() {
    url = 'templates/add/modal' + case_param();
    $('#modal_report_template_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        /* create the select picker for language  */
        $('#report_language').selectpicker({
            liveSearch: true,
            title: "Language",
            style: "Bootstrap 4: 'btn-outline-primary'"
        });
        $('#report_type').selectpicker({
            liveSearch: true,
            title: "Report type",
            style: "Bootstrap 4: 'btn-outline-primary'"
        });
        $('#form_new_report_template').submit("click", function (event) {

            event.preventDefault();
            var formData = new FormData(this);

            $.ajax({
                url: 'templates/add' + case_param(),
                type: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (notify_auto_api(data)) {
                        refresh_template_table();
                        $('#modal_add_report_template').modal('hide');
                    }
                },
                error: function (error) {
                    if(error.responseJSON) {
                        notify_error(error.responseJSON.message);
                    } else {
                        ajax_notify_error(error, this.url);
                    }
                }
            });

            return false;
        })
    });
    $('#modal_add_report_template').modal({ show: true });
}