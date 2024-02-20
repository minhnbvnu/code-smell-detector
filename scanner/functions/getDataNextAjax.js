function getDataNextAjax(pageId) {
    next = false;
    $('.error-message').html('');
    $('#pageId').val(parseInt($('#pageId').val()) + 1);
    nextUrl === 'news_api' ? nextUrl = 'newsapi' : nextUrl;
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'post',
        url: '/discovery/content_studio/' + nextUrl + '/search/next',
        data: $('form#search').serialize(),
        dataType: 'JSON',
        success: function (data) {
            next = true;
            $('body').find('#searchBtn').html('Search');
            $('#loading-more-message').remove();
            let list = $('#list');
            if (!data.error) {
                list.append(data);
            }
        },
        error: function (error) {
            $('body').find('#searchBtn').html('Search');
            $('#loading-more-message').remove();
            if (error.status === 422) {
                let errors = $.parseJSON(error.responseText);
                $.each(errors, function (key, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (key, value) {
                            $("#error-" + key).empty().html(`${value}`);
                            toastr.error(`${value}`);
                        });
                    }
                });
            }
        },
    });
}