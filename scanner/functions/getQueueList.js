function getQueueList() {
    var str = global(KEY);
    var script_queue_list = str ? JSON.parse(str) : [];
    return script_queue_list;
}