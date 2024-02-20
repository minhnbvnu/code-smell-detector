function get_activities () {

    get_request_api('/dim/tasks/list/1000')
    .done((data) => {
         if (notify_auto_api(data, true)) {
            content = data.data;
            Table.clear();
            Table.rows.add(content);
            Table.columns.adjust().draw();
            $('#feed_last_updated').text("Last updated: " + new Date().toLocaleTimeString());
            hide_loader();
        }
    });

}