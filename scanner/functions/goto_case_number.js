function goto_case_number() {
    case_id = $('#goto_case_number_input').val();
    if (case_id !== '' && isNaN(case_id) === false) {

        get_request_api('/case/exists', true, null, case_id)
        .done(function (data){
            if(notify_auto_api(data, true)) {
                var url = new window.URL(document.location);
                url.searchParams.set("cid", case_id);
                window.location.href = url.href;
            }
        });

    }
}