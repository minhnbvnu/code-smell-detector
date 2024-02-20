function getDataAjax(formData, action) {
        $('#list').html('');
        $('.error-message').html('');
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
                if (data.error !== "undefined" && data.error === 'No data available'){
                    toastr.error(data.error);
                }
                $('body').find('#searchBtn').html('Search');
                $('#loading-more-message').remove();
                $('#notification').remove();
                $('#list').append(data);
                next = true;
                window.history.pushState(null, null, addOrUpdateUrlParam(new FormData(formData)));
            },
            error: function (error) {
                $('body').find('#searchBtn').html('Search');
                if (error.status === 422) {
                    let errors = $.parseJSON(error.responseText);
                    $.each(errors, function (key, value) {
                        if ($.isPlainObject(value)) {
                            $.each(value, function (key, value) {
                                $("#error-" + key).html(`${value}`);
                                toastr.error(`${value}`);
                            });
                        }
                    });
                }
                console.log('getDataAjax Error', error);
            },
        });
    }