function asyncWrite(data, target, err, finish) {
    if (!repo)
        Spine.Route.navigate("");
    repo.write("master", target, data, "simple",
               function(e) {
                   var ret = err(e);
                   if (ret == false)
                       finish();
                });
}