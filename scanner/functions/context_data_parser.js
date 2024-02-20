function context_data_parser(data, fire_modal = true) {
    if(notify_auto_api(data, true)) {
        $('#user_context').empty();

        $('#user_context').append('<optgroup label="Open" id="switch_case_opened_opt"></optgroup>');
        $('#user_context').append('<optgroup label="Closed" id="switch_case_closed_opt"></optgroup>');
        ocs = data.data;
        ret_data = [];
        for (index in ocs) {
            case_name = sanitizeHTML(ocs[index].name);
            cs_name = sanitizeHTML(ocs[index].customer_name);
            ret_data.push({
                        'value': ocs[index].case_id,
                        'text': `${case_name} (${cs_name}) ${ocs[index].access}`
                    });
            if (ocs[index].close_date != null) {
                $('#switch_case_closed_opt').append(`<option value="${ocs[index].case_id}">${case_name} (${cs_name}) ${ocs[index].access}</option>`);
            } else {
                $('#switch_case_opened_opt').append(`<option value="${ocs[index].case_id}">${case_name} (${cs_name}) ${ocs[index].access}</option>`)
            }
        }

        if (fire_modal) {
            $('#modal_switch_context').modal("show");
        }

        $('#user_context').selectpicker('refresh');
        $('#user_context').selectpicker('val', get_caseid());
        return ret_data;

    }
}