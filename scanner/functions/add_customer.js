function add_customer() {
    const url = 'customers/add/modal' + case_param();
    $('#modal_add_customer_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#form_new_customer').on("submit", preventFormDefaultBehaviourOnSubmit);
        $('#submit_new_customer').on("click", function () {
            const form = $('#form_new_customer').serializeObject();

            ret = get_custom_attributes_fields();
            has_error = ret[0].length > 0;
            attributes = ret[1];

            if (has_error){return false;}

            form['custom_attributes'] = attributes;

            post_request_api('customers/add', JSON.stringify(form), true)
            .done((data) => {
                 if(notify_auto_api(data)) {
                    refresh_customer_table();
                    $('#modal_add_customer').modal('hide');
                 }
            });

            return false;
        })
    });
    $('#modal_add_customer').modal({show: true});
}