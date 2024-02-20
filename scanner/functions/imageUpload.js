function imageUpload(privacy) {
    let file_data = $('#file-upload').prop('files')[0];
    let form_data = new FormData();
    form_data.append('title', $("#image_name").val());
    form_data.append('file', file_data);
    form_data.append('privacy', privacy);
    $.ajax({
        url: "/imagelibary/upload-image",
        type: 'post',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.code === 200) {
                $("#privateImagesError1, #privateImagesError2").html("");
                let append = "";
                $(".modal-backdrop").remove();
                $('#uploadImageModal').hide().removeClass("hide");
                $("#image_name").val("");
                $("#file-upload").val("");
                response.data.map(function (image) {
                    $("#usedSize").empty();
                    USEDSIZE = Number(USEDSIZE + image.media_size);
                    $("#usedSize").append(sizeConverter(USEDSIZE));
                });
                toastr.success("successfully uploaded", "", {
                    timeOut: 2000,
                    fadeOut: 2000,
                    onHidden: function () {
                        window.location.reload();
                    }
                });
            } else if (response.code === 201) {
                // $('#uploadImageModal').modal('show');
                let i;
                for (i of response.msg) {
                    switch (i) {
                        case 'File name is Required':
                            $('#image_name_error1, #image_name_error2').html(i);
                            break;
                        case 'The file must be a file of type: jpeg, jpg, png.':
                            toastr.error(i);
                            break;
                    }
                }
            } else if (response.code === 202) {
                toastr.error(response.msg);
            } else if(response.code === 400 && response.error === "Data too long for column 'title' at row 1"){
                toastr.error('Title is too long');
            } else {
                $('#uploadImageModal').modal('hide');
                toastr.error(response.message);
            }
        },
        error: function () {
            // toastr.error("Not able to load");
        }
    })
}