function mergeCollection(collection, delta, serverVersion){

        //增量
        var doReactiveProcess = false;
        for (var i = 0, ilen = delta.length; i < ilen; i++){
            var struct = delta[i];
            //此处顺序为，先insert，delete,然后update
            if(struct.type == 'insert'){
                var structData = struct['cnt'];
                var is_exist = collection.find({smr_id : structData.smr_id});
                if (is_exist.length) {
                    /*当本次存在id相同的项目时，认为是latency compensation的server回发请求，
                    但由于服务器上可能通过beforeInsert来修改数据，因此在这里先移除本地数据，再使用服务器的数据*/
                   /*FIXME 这里应该有一个标记，判断数据是否被服务器修改过，否则每次都reactive性能太差*/
                    /*collection.remove({
                        'smr_id' : structData.smr_id
                    });
                   
                    /*collection.update({
                        _id : structData._id
                    }, {
                        __clientId : structData.__clientId
                    })*/
                    doReactiveProcess = false;
                } else {
                    var externalInfo = fw.pubsub._subscribeMgr[collection.pubName].externalInfo;
                    if(externalInfo){
                        var uc = externalInfo.uniqueColumn;
                        var criteria = {};
                        criteria[uc] = structData[uc];
                        var is_uc_exist = collection.find(criteria);
                        if(is_uc_exist.length){
                            is_uc_exist[0].set("smr_id", structData.smr_id);
                        }else{
                            collection.add(structData);
                        }
                    }else{
                        collection.add(structData);
                    }
                    doReactiveProcess = true;  
                }
            } else if (struct.type == 'delete'){
                var structData = struct['cnt'];
                //属于server下发的删除，只做remove即可，因为不知道到底是数据被删除，还是仅因为不符合pubfunc规则而被移除了
                
                collection.remove({
                    'smr_id IN' : structData //这里已经是经过server变换的smr_id数组了
                });
                doReactiveProcess = true;
                
            } else if (struct.type == 'update'){

                var model = collection.find({
                    smr_id    :  struct.id
                });

                if(model.length>0){
                    model = model[0];
                }else{
                    continue;
                }
                var structData = mergeModel(model,struct['cnt']);
                /*var updateMap = {};
          
                updateMap = structData;
                //FIXME 这里是setdirty唯一的问题，服务器下发的update会把dirty位搞脏。但不造成实际bug影响，因会触发diff，发现并无实质更新
                collection.update(updateMap, {
                    smr_id    :  struct.id
                });*/
                doReactiveProcess = true;
            }
            //更新client collection version
            collection.setVersion(serverVersion);
        }
        return doReactiveProcess;
    }