function sync_editor(no_check) {

    $('#last_saved').text('Syncing..').addClass('badge-danger').removeClass('badge-success');

    get_request_api('/case/summary/fetch')
    .done((data) => {
        if (data.status == 'success') {
            if (no_check) {
                // Set the content from remote server
                from_sync = true;
                editor.getSession().setValue(data.data.case_description);

                // Set the CRC in page
                $('#fetched_crc').val(data.data.crc32.toString());
                $('#last_saved').text('Changes saved').removeClass('badge-danger').addClass('badge-success');
                $('#content_last_sync').text("Last synced: " + new Date().toLocaleTimeString());
            }
            else {
                // Check if content is different
                st = editor.getSession().getValue();
                if (data.data.crc32 != $('#fetched_crc').val()) {
                    // Content has changed remotely
                    // Check if we have changes locally
                    local_crc = crc32(st).toString();
                    console.log('Content changed. Local CRC is ' + local_crc);
                    console.log('Saved CRC is ' + $('#fetched_crc').val());
                    console.log('Remote CRC is ' + data.data.crc32);
                    if (local_crc == $('#fetched_crc').val()) {
                        // No local change, we can sync and update local CRC
                        editor.getSession().setValue(data.data.case_description);
                        $('#fetched_crc').val(data.data.crc32);
                        $('#last_saved').text('Changes saved').removeClass('badge-danger').addClass('badge-success');
                        $('#content_last_sync').text("Last synced: " + new Date().toLocaleTimeString());
                    } else {
                        // We have a conflict
                        $('#last_saved').text('Conflict !').addClass('badge-danger').removeClass('badge-success');
                        swal ( "Oh no !" ,
                        "We have a conflict with the remote content.\nSomeone may just have changed the description at the same time.\nThe local content will be copied into clipboard and content will be updated with remote." ,
                        "error"
                        ).then((value) => {
                            // Old fashion trick
                            editor.selectAll();
                            editor.focus();
                            document.execCommand('copy');
                            editor.getSession().setValue(data.data.desc);
                            $('#fetched_crc').val(data.data.crc32);
                            notify_success('Content updated with remote. Local changes copied to clipboard.');
                            $('#content_last_sync').text("Last synced: " + new Date().toLocaleTimeString());
                        });
                    }
                } else {
                    // Content did not change remotely
                    // Check local change
                    local_crc = crc32(st).toString();
                    if (local_crc != $('#fetched_crc').val()) {
                        console.log('Local change. Old CRC is ' + local_crc);
                        console.log('New CRC is ' + $('#fetched_crc').val());
                        var data = Object();
                        data['case_description'] = st;
                        data['csrf_token'] = $('#csrf_token').val();
                        // Local change detected. Update to remote
                        $.ajax({
                            url: '/case/summary/update' + case_param(),
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json;charset=UTF-8",
                            data: JSON.stringify(data),
                            success: function (data) {
                                if (data.status == 'success') {
                                    collaborator.save();
                                    $('#content_last_sync').text("Last synced: " + new Date().toLocaleTimeString());
                                    $('#fetched_crc').val(data.data);
                                    $('#last_saved').text('Changes saved').removeClass('badge-danger').addClass('badge-success');
                                } else {
                                    notify_error("Unable to save content to remote server");
                                    $('#last_saved').text('Error saving !').addClass('badge-danger').removeClass('badge-success');
                                }
                            },
                            error: function(error) {
                                notify_error(error.responseJSON.message);
                                ('#last_saved').text('Error saving !').addClass('badge-danger').removeClass('badge-success');
                            }
                        });
                    }
                    $('#content_last_sync').text("Last synced: " + new Date().toLocaleTimeString());
                    $('#last_saved').text('Changes saved').removeClass('badge-danger').addClass('badge-success');
                }
            }
        }
    });
}