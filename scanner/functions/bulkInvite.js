function bulkInvite() {
    let file = $("#upload-bulk").get(0).files.length;
    if (file == 0) {
        toastr.error('Please select a file first in .xlxs format');
        return;
    }
    let file_data = $("#upload-bulk").prop("files")[0];
    let form_data = new FormData();
    form_data.append("file", file_data);
    $.ajax({
        type: "post",
        url: '/bulk-invite',
        data: form_data,
        cache: false,
        processData: false,
        contentType: false,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {
            $('#bulkInvites').html('Sending Invite...');
        },
        success: function (response) {
            $('#bulkInvites').html('Bulk Invite');
            if (response.code === 200) {
                $('#invite').modal('hide');
                toastr.success('Mail sent successfully');
                document.getElementById("upload-bulk").value = "";
            } else if (response.code === 400) {
                toastr.error(response.error);
            } else if (response.code === 401) {
                toastr.error(response.error);
            } else {
                toastr.error(response.message);

            }
        }
    });

}