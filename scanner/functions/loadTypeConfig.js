function loadTypeConfig () {

        utils.loadFile(document,{
            src : resourceRoot + "/dialogs/charts/chart.config.js",
            tag : "script",
            type : "text/javascript",
            defer : "defer"
        },function(){

            render();

        });

    }