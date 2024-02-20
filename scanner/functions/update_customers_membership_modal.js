function update_customers_membership_modal(user_customers) {
    for (let index in current_customers_list) {
        data_dc.push({
            label: current_customers_list[index].customer_name,
            value: current_customers_list[index].customer_id
        });
    }

    let us_customer = $('#user_customers_membership');

    us_customer.multiselect({
        buttonWidth: 400,
        nonSelectedText: 'Select customers',
        includeSelectAllOption: true,
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search',
        filterBehavior: 'both',
        widthSynchronizationMode: 'ifPopupIsSmaller'
    });

    us_customer.multiselect('dataprovider', data_dc );

    us_customer.multiselect('select', user_customers);

    us_customer.multiselect('refresh')
}