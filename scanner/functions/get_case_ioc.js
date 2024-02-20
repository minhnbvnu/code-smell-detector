function get_case_ioc() {
    show_loader();

    get_request_api("/case/ioc/list")
    .done(function (response) {
        if (response.status == 'success') {
            if (response.data != null) {
                jsdata = response.data;
                Table.clear();
                Table.rows.add(jsdata.ioc);

                set_last_state(jsdata.state);
                $('#ioc_table_wrapper').on('click', function(e){
                    if($('.popover').length>1)
                        $('.popover').popover('hide');
                        $(e.target).popover('toggle');
                    });

                $('#ioc_table_wrapper').show();
                Table.columns.adjust().draw();
                load_menu_mod_options('ioc', Table, delete_ioc);
                hide_loader();
                Table.responsive.recalc();
                $('[data-toggle="popover"]').popover();

                $(document)
                    .off('click', '.ioc_details_link')
                    .on('click', '.ioc_details_link', function(event) {
                    event.preventDefault();
                    let ioc_id = $(this).data('ioc_id');
                    edit_ioc(ioc_id);
                });


            } else {
                Table.clear().draw();
                swal("Oh no !", data.message, "error")
            }
        } else {
            Table.clear().draw()
        }
    })
}