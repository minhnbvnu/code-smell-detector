function loadJQuery () {

        //不存在jquery， 则加载jquery
        if ( !window.jQuery ) {

            utils.loadFile(document,{
                src : resourceRoot + "/third-party/jquery-1.10.2.min.js",
                tag : "script",
                type : "text/javascript",
                defer : "defer"
            },function(){

                loadHighcharts();

            });

        } else {

            loadHighcharts();

        }

    }