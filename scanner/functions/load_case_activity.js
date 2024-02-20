function load_case_activity(){
    get_request_api('/case/activities/list')
    .done((data) => {
        js_data = data.data;
        $('#case_activities').empty();
        for (index in js_data) {

            if (js_data[index].is_from_api) {
                api_flag = 'feed-item-primary';
                title = 'Activity issued from API';
            } else {
                api_flag = 'feed-item-default';
                title = 'Activity issued from GUI';
            }

            entry =	`<li class="feed-item ${api_flag}" title='${sanitizeHTML(title)}'>
                    <time class="date" datetime="${js_data[index].activity_date}">${js_data[index].activity_date}</time>
                    <span class="text">${sanitizeHTML(js_data[index].name)} - ${sanitizeHTML(js_data[index].activity_desc)}</span>
                    </li>`
            $('#case_activities').append(entry);
        }
    });
}