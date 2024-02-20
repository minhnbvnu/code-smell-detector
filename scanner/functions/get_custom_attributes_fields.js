function get_custom_attributes_fields() {
    values = Object();
    has_error = [];
    $("input[id^='inpstd_']").each(function (i, el) {
        tab = $(el).attr('data-ref-tab');
        field = $(el).attr('data-attr-for');
        if (!(tab in values)) { values[tab] = {} };

        values[tab][field] = $(el).val();
        if ($(el).prop('required') && !values[tab][field]) {
            $(el).parent().addClass('has-error');
            has_error.push(field);
        } else {
             $(el).parent().removeClass('has-error');
        }
    })
    $("textarea[id^='inpstd_']").each(function (i, el) {
        tab = $(el).attr('data-ref-tab');
        field = $(el).attr('data-attr-for');
        if (!(tab in values)) { values[tab] = {} };
        values[tab][field] = $(el).val();
        if ($(el).prop('required') && !values[tab][field]) {
            $(el).parent().addClass('has-error');
            has_error.push(field);
        } else {
             $(el).parent().removeClass('has-error');
        }
    })
    $("input[id^='inpchk_']").each(function (i, el) {
        tab = $(el).attr('data-ref-tab');
        field = $(el).attr('data-attr-for');
        if (!(tab in values)) { values[tab] = {} };
        values[tab][field] = $(el).is(':checked');
    })
    $("select[id^='inpselect_']").each(function (i, el) {
        tab = $(el).attr('data-ref-tab');
        field = $(el).attr('data-attr-for');
        if (!(tab in values)) { values[tab] = {} };
        values[tab][field] = $(el).val();
        if ($(el).prop('required') && !values[tab][field]) {
            $(el).parent().addClass('has-error');
            has_error.push(field);
        } else {
             $(el).parent().removeClass('has-error');
        }
    })

    if (has_error.length > 0) {
        msg = 'Missing required fields: <br/>';
        for (field in has_error) {
            msg += '  - ' + has_error[field] + '<br/>';
        }
        notify_error(msg);
    }

    return [has_error, values];
}