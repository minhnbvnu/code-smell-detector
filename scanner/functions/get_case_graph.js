function get_case_graph() {
    get_request_api('graph/getdata')
    .done((data) => {
            if (data.status == 'success') {
                redrawAll(data.data);
                hide_loader();
            } else {
                $('#submit_new_asset').text('Save again');
                swal("Oh no !", data.message, "error")
            }
        })
}