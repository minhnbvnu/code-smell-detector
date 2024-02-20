function loadHighcharts () {

        //不存在Highcharts， 则加载Highcharts
        if ( !window.Highcharts ) {

            utils.loadFile(document,{
                src : resourceRoot + "/third-party/highcharts/highcharts.js",
                tag : "script",
                type : "text/javascript",
                defer : "defer"
            },function(){

                loadTypeConfig();

            });

        } else {

            loadTypeConfig();

        }

    }