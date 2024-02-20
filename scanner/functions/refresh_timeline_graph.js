function refresh_timeline_graph(){
    show_loader();
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    group = urlParams.get('group-by');
    visualizeTimeline(group);
}