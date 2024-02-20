function updateRating(rating, accountId) {
    $.ajax({
        type: "put",
        url: '/imagelibary/rate-image',
        data: {accountId, rating},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if (response.code === 200) {
                toastr.success('Rating successfully updated', "", {
                    timeOut: 1000,
                    fadeOut: 1000,
                    onHidden: function () {
                        window.location.reload();
                    }
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