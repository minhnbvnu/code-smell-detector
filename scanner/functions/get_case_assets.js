function get_case_assets() {
    show_loader();

    get_request_api('/case/assets/list')
    .done(function (response) {
        if (response.status == 'success') {
            if (response.data != null) {
                jsdata = response.data;
                if (jsdata.assets.length > 299) {
                    set_page_warning("Backref disabled due to too many assets in the case");
                } else {
                    set_page_warning("");
                }
                Table.clear();
                Table.rows.add(jsdata.assets);
                Table.columns.adjust().draw();
                load_menu_mod_options('asset', Table, delete_asset);
                $('[data-toggle="popover"]').popover();
                set_last_state(jsdata.state);
                hide_loader();
                Table.responsive.recalc();

                $(document)
                    .off('click', '.asset_details_link')
                    .on('click', '.asset_details_link', function(event) {
                    event.preventDefault();
                    let asset_id = $(this).data('asset_id');
                    asset_details(asset_id);
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