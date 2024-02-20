async function do_case_review(action, reviewer_id) {
    let data = Object();
    data['csrf_token'] = $('#csrf_token').val();
    data['action'] = action;
    if (reviewer_id) {
        data['reviewer_id'] = reviewer_id;
    }

    return post_request_api('/case/review/update', JSON.stringify(data));
}