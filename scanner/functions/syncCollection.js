function syncCollection(type, pubname, val, item, isPlainStruct, serverVersion){
	    var collection = item.collection,
            doReactiveProcess = false,
            delta = [];
        
        if(isPlainStruct){//publish callback是传过来的data是个简单对象。不是一个collection
            collection = val;
            doReactiveProcess = true;
        }else{
            if(type == 'data_write_from_server_delta'){
                delta = val;
                doReactiveProcess = mergeCollection(collection, delta, serverVersion);
            } else {
                //全量
                if(!collection._isSynced() || collection.stringify() !== JSON.stringify(val)){
                    collection.setData(val);
                    collection.setVersion(serverVersion);
                    doReactiveProcess = true;
                }
            }
        }
        
        if(!isPlainStruct)collection._takeSnapshot();


        //onInser, onUpdate, onDelete callback
        deltaProcess(collection, delta);

        if(doReactiveProcess === true){
            
            //因为JS的单线程执行，只要callback中没有setTimeout等异步调用，全局变量tapped_blocks就不会产生类似多进程同时写的冲突。
            //FIX BY SUNDONG,tapped_blocks在callback不要清空已经bind的东西
            //添加修正，由于前端渲染是实时进行，所以在前端的回调中，要清空已渲染的
            var tapped_blocks = [];
            if (_controller._tapped_blocks && isServer) {
                tapped_blocks = _controller._tapped_blocks;
            }else{
                _controller.__reg('_tapped_blocks', tapped_blocks, true);
            }
            
            
            var byPageSegment = new RegExp('@@_sumeru_@@_page_([\\d]+)'),
            ifPageMatch = pubname.match(byPageSegment);
            if (ifPageMatch) {
                item.callback(collection, {
                    //delta : delta,  FIXME 待端=>云的协议与云=>端的协议统一后，统一提供增量的delta给subscribe
                    page  : ifPageMatch[1]
                });  //额外传递一个页码page 
            } else {
                item.callback(collection, {
                    delta : delta //FIXME 待端=>云的协议与云=>端的协议统一后，统一提供增量的delta给subscribe
                });

            }
            
            //每个Controller的render方法会保证局部渲染一定等待主渲染流程完成才开始。
            _controller && _controller.reactiveRender(tapped_blocks);
        }
        
        //a flag tells if data have been stored remotely
        if(!isPlainStruct){
            collection._setSynced(true);
            fw.cache.setPubData(pubname,item.args,JSON.stringify(collection.getData()));
        }
    }