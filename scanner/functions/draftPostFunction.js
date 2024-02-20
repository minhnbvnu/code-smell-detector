function draftPostFunction(postStatus) {
    $('#add_account_error1, #add_image_error1, #text_area_error1').html("");
    let formData = new FormData(document.getElementById('one_click_form_id'));
    formData.append('postStatus', postStatus);
    formData.append('selected_image', selectedImage);
    $.ajax({
        url: "/imagelibary/draft-post",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        beforeSend: function () {
            $('#resocioModal').modal('show');
        },
        success: function (resp) {
            if(resp.message === "Saved as draft"){
                toastr.success(resp.message);
            }else if(Number(postStatus) === 1 && resp.code === 200 && resp.data.errors.length === 0) {
                $('#resocioModal').modal('hide');
                toastr.success(resp.message);
                location.reload();
            } else if (resp.code === 200 && resp.data.errors.length > 0) {
                toastr.error(resp.data.errors[0].error);
            } else if (resp.code === 201) {
                let i;
                for (i of resp.msg) {
                    switch (i) {
                        case 'Please select Social Accounts':
                            $('#add_account_error1').html(i);
                            break;
                            case 'Image is required':
                            $('#add_image_error1').html(i);
                            break;
                            case 'Text is required':
                            $('#text_area_error1').html(i);
                            break;
                        case 'URl format should be valid':
                            $('#text_area_error2').html(i);
                            break;
                    }
                }
            } else if (resp.code === 200 && resp.data.errors.length === 0) {
                $('#resocioModal').modal('hide');
                toastr.success(resp.message);
            } else if (Number(postStatus) === 0 && resp.code !== 200)  toastr.success(resp.error);
        },
        error: function (jqXHR) {
            toastr.error("Not able to load");
        }
    });
}