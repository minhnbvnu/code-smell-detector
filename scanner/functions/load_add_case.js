function load_add_case() {
    // Dynamically load the modal
    $('#modal_add_case_content').load('/manage/cases/add/modal', function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, '/case/add');
             return false;
        }
        $('#case_customer').selectpicker({
            liveSearch: true,
            title: "Select customer *",
            style: "btn-outline-white",
            size: 8
        });
        $('#case_template_id').selectpicker({
            liveSearch: true,
            title: "Select case template",
            style: "btn-outline-white",
            size: 8
        });
        $('#case_template_id').prepend(new Option('', ''));
        $('#classification_id').selectpicker({
            liveSearch: true,
            title: "Select classification",
            style: "btn-outline-white",
            size: 8
        });
        $('#classification_id').prepend(new Option('', ''));

        $('#modal_add_case').modal({show:true});
    });
}