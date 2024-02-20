function submit_new_case() {

    let data_sent = $('form#form_new_case').serializeObject();
    let ret = get_custom_attributes_fields();
    let has_error = ret[0].length > 0;
    let attributes = ret[1];

    if (has_error){return false;}

    data_sent['custom_attributes'] = attributes;

    send_add_case(data_sent);

    return false;
}