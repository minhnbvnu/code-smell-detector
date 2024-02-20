function assettype_detail(asset_id) {
    url = '/manage/asset-type/update/' + asset_id + '/modal' + case_param();
    $('#modal_add_type_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#form_new_asset_type').submit("click", function (event) {
            event.preventDefault();
            var formData = new FormData(this);

            url = '/manage/asset-type/update/' + asset_id + case_param();

            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                  if(notify_auto_api(data, true)) {
                        refresh_asset_table();
                        $('#modal_add_type').modal('hide');
                  }
                },
                error: function (jqXHR) {
                    if(jqXHR.responseJSON && jqXHR.status == 400) {
                        propagate_form_api_errors(jqXHR.responseJSON.data);
                    } else {
                        ajax_notify_error(jqXHR, this.url);
                    }
                }
            });

            return false;
        });
        $('#modal_add_type').modal({ show: true });
    });
}