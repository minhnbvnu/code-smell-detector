function load_dim_limited_tasks(){
    get_request_api('/dim/tasks/list/100')
    .done((data) => {
        js_data = data.data;
        $('#dim_tasks_feed').empty();
        for (index in js_data) {

            if (js_data[index].state == 'success') {
                api_flag = 'feed-item-success';
                title = 'Task succeeded';
            } else {
                api_flag = 'feed-item-warning';
                title = 'Task pending or failed';
            }

            entry =	`<li class="feed-item ${api_flag}" title='${title}'>
                    <time class="date" datetime="${js_data[index].activity_date}">${js_data[index].date_done}</time>
                    <span class="text" title="${js_data[index].task_id}"><a href="#" onclick='dim_task_status("${js_data[index].task_id}");return false;'>${js_data[index].module}</a> - ${js_data[index].user}</span>
                    </li>`
            $('#dim_tasks_feed').append(entry);
        }
    });
}