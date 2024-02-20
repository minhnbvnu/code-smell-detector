function loadPlugins(me){
        //初始化插件
        for (var pi in UE.plugins) {
            UE.plugins[pi].call(me);
        }

    }