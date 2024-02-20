function ratingUpdate(rating, accountId) {
    $.ajax({
        type: "post",
        url: '/update-rating',
        data: {accountId, rating},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {
        },
        success: function (response) {
            if (response.code === 200) {
                toastr.success('Sucessfully Updated Rating', {
                    timeOut: 1000,
                    fadeOut: 1000,
                });
            } else if (response.code === 400) {
                toastr.error(response.message, {
                    timeOut: 1000,
                    fadeOut: 1000,
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}