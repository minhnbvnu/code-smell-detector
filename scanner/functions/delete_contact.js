function delete_contact(contact_id, customer_id) {
    post_request_api('/manage/customers/' + customer_id + '/contacts/' + contact_id + '/delete', null, true)
    .done((data) => {
        if(notify_auto_api(data)) {
            window.location.reload();
        }
    });
}