function get_cases_overview(silent, show_full=false) {
    show_loader();
    show_full = show_full || $('#overviewLoadClosedCase').prop('checked');

     $('#overviewTableTitle').text(show_full ? 'All cases' : 'Open cases');

    get_raw_request_api('/overview/filter?cid=' + get_caseid() + (show_full ? '&show_closed=true' : ''))
    .done((data) => {
        if(notify_auto_api(data, silent)) {
            overview_list = data.data;
            OverviewTable.clear();
            OverviewTable.rows.add(overview_list);
            OverviewTable.columns.adjust().draw();
            $(".truncate").on("click", function() {
                var index = $(this).index() + 1;
                $('table tr td:nth-child(' + index  + ')').toggleClass("truncate");
            });

            hide_loader();
        }
    });
}