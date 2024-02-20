function load_context_switcher() {

    var options = {
            ajax: {
            url: '/context/search-cases'+ case_param(),
            type: 'GET',
            dataType: 'json'
        },
        locale: {
                emptyTitle: 'Select and Begin Typing',
                statusInitialized: '',
        },
        minLength: 0,
        clearOnEmpty: false,
        emptyRequest: true,
        preprocessData: function (data) {
            return context_data_parser(data);
        },
        preserveSelected: false
    };


    get_request_api('/context/search-cases')
    .done((data) => {
        context_data_parser(data);
        $('#user_context').ajaxSelectPicker(options);
    });
}