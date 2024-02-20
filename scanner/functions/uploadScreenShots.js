function uploadScreenShots(id, title, spanid) {
    html2canvas(getContentFromDivWithoutLoader(id, spanid), {
        scrollY: -window.scrollY,
        useCORS: true,
    }).then(function (canvas) {
        var image = canvas.toDataURL("image/png", 1);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'post',
            url: '/upload-screenshots',
            data: {
                image, title
            },
            success: function (response) {
                if (response.code === 200) {
                    $.ajax({
                        type: 'get',
                        url: '/get-reports-Images-onload',
                        beforeSend: function () {
                            $('#reportsCount').empty();
                        },
                        success: function (response) {
                            $('#' + spanid).css("display", "none");
                            if (response.code === 200) {
                                let cart_no = response.data.length;
                                setTimeout(() => {
                                    $('#reportsCount').append(cart_no++);
                                }, 100);
                            }
                        }
                    });
                    toastr.success('Successfully added to custom reports');
                } else if (response.code === 400) {
                    toastr.error(response.error);
                } else {
                    toastr.error('Some error occured');
                }
            }
        });
    });
}