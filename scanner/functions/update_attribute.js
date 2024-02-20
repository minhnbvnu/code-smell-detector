function update_attribute(attr_id, editor, partial, complete){
    event.preventDefault();

    var data_sent = Object();
    data_sent['attribute_content'] = editor.getSession().getValue();
    data_sent['csrf_token'] = $("#csrf_token").val();
    data_sent['partial_overwrite'] = partial;
    data_sent['complete_overwrite'] = complete;

    $('#alert_attributes_edit').empty();
    $('#alert_attributes_details').hide();
    $('#attributes_err_details_list').empty();

    post_request_api('/manage/attributes/update/' + attr_id, JSON.stringify(data_sent), false, function() {
        window.swal({
              title: "Updating and migrating...",
              text: "Please wait",
              icon: "/static/assets/img/loader.gif",
              button: false,
              allowOutsideClick: false
        });
    })
    .done((data) => {
        notify_auto_api(data);
    })
    .fail((error) => {
        data = error.responseJSON;
        $('#submit_new_attribute').text('Save');
        $('#alert_attributes_edit').text(data.message);
        if (data.data && data.data.length > 0) {
            for(var i in data.data)
            {
               var output='<li>'+ sanitizeHTML(data.data[i]) +'</li>';
               $('#attributes_err_details_list').append(output);
            }

            $('#alert_attributes_details').show();
        }
        $('#alert_attributes_edit').show();
        $('#submit_new_module').text("Retry");
    })
    .always((data) => {
        window.swal.close();
    });

    return false;
}