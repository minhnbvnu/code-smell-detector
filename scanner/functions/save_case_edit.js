function save_case_edit(case_id) {

    var data_sent = $('form#form_update_case').serializeObject();
    var map_protagonists = Object();

    for (e in data_sent) {
        if (e.startsWith('protagonist_role_')) {
            map_protagonists[e.replace('protagonist_role_', '')] = {
                'role': data_sent[e]
            };
            delete data_sent[e];
        }
        if (e.startsWith('protagonist_name_')) {
            map_protagonists[e.replace('protagonist_name_', '')]['name'] = data_sent[e];
            delete data_sent[e];
        }
        if (e.startsWith('protagonist_contact_')) {
            map_protagonists[e.replace('protagonist_contact_', '')]['contact'] = data_sent[e];
            delete data_sent[e];
        }
        if (e.startsWith('protagonist_id_')) {
            map_protagonists[e.replace('protagonist_id_', '')]['id'] = data_sent[e];
            delete data_sent[e];
        }
    }
    data_sent['protagonists'] = [];
    for (e in map_protagonists) {
        data_sent['protagonists'].push(map_protagonists[e]);
    }

    data_sent['case_tags'] = $('#case_tags').val();

    ret = get_custom_attributes_fields();
    has_error = ret[0].length > 0;
    attributes = ret[1];

    if (has_error){return false;}

    data_sent['custom_attributes'] = attributes;

    data_sent['csrf_token'] = $('#csrf_token').val();

    post_request_api('/manage/cases/update/' + case_id, JSON.stringify(data_sent), true, undefined, case_id)
    .done((data) => {
        if(notify_auto_api(data)) {
            case_detail(case_id);
        }
    });
}