async function update_ureviews_list() {
    get_raw_request_api("/user/reviews/list" + case_param())
    .done((data) => {
        if (notify_auto_api(data, true)) {
            if (data.data.length == 0) {
                $('#rowPendingCasesReview').hide();
                return;
            }
            UserReviewsTable.clear();
            UserReviewsTable.rows.add(data.data);
            UserReviewsTable.columns.adjust().draw();
            $('[data-toggle="popover"]').popover();
            $('#ureviews_last_updated').text("Last updated: " + new Date().toLocaleTimeString());
            $('#rowPendingCasesReview').show();
        }
    });
}