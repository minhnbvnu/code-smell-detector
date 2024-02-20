function asyncWriteFile(source, target, err, finish) {
    if (!repo)
        Spine.Route.navigate("");
    $.ajax({
        url: source, 
        type: "GET",
        success: function(data) {asyncWrite(data, target, err, finish)},
        error: function(e) {err(e);}
    });
}