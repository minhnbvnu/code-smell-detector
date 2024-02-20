function get_case_rfiles() {

    get_request_api("/case/evidences/list")
    .done(function (response) {
        if (response.status == 'success') {
            if (response.data != null) {
                jsdata = response.data;
                Table.clear();
                Table.rows.add(jsdata.evidences);
                Table.columns.adjust().draw();

                load_menu_mod_options('evidence', Table, delete_rfile);

                set_last_state(jsdata.state);
                hide_loader();

                $('#rfiles_table_wrapper').show();
                Table.responsive.recalc();

                $(document)
                    .off('click', '.evidence_details_link')
                    .on('click', '.evidence_details_link', function(event) {
                    event.preventDefault();
                    let evidence_id = $(this).data('evidence_id');
                    edit_rfiles(evidence_id);
                });

            } else {
                Table.clear().draw();
                swal("Oh no !", data.message, "error")
            }
        } else {
            Table.clear().draw()
        }
    });

}