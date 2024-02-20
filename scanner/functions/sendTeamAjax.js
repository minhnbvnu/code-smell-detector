function sendTeamAjax(formData, action) {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'post',
            url: action,
            data: new FormData(formData),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data.code === 200) {
                    toastr.success("You have successfully created a team", "Success");
                    $('#' + $(formData).attr('id')).closest('.modal').modal('hide');
                } else {
                    toastr.error(`${data.error}`)
                }
            },
            error: function (data) {
                if (data.status === 422) {
                    let errors = $.parseJSON(data.responseText);
                    $.each(errors, function (key, value) {
                        $('#response').addClass("alert alert-danger");
                        if ($.isPlainObject(value)) {
                            $.each(value, function (key, value) {
                                toastr.error(`${value}`)
                            });
                        }
                    });
                }
            }
        })
    }