function report_detail(report_id) {
    url = 'templates/update/' + report_id + case_param();
    $('#modal_report_template_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_report_template').on("click", function () {
            $.ajax({
                url: url,
                type: "POST",
                data: $('#form_new_report_template').serializeArray(),
                dataType: "json",
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
    $('#modal_report_template').modal({ show: true });
}