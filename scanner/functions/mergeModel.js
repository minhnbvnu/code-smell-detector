function mergeModel(model, struct){
        var structGroupType,structGroupCnt;
        var modelName = model._modelName;
        var modelFieldsMap = fw.model._getModelTemp(modelName)._fieldsMap,
            fieldType,subModelName,subModelRelation;
        for (var i = 0, ilen = struct.length; i < ilen; i++){
            structGroupType = struct[i].type;
            structGroupCnt = struct[i].cnt;

            if(structGroupType=="insert"){
                for(var p in structGroupCnt){
                    fieldType = modelFieldsMap[p]['type'];
                    if(fieldType=="model"){
                        subModelName = modelFieldsMap[p]['model'];
                        subModelRelation = modelFieldsMap[p]['relation'];
                        if(subModelRelation=="many"){
                            var subCollection = fw.collection.create({modelName : subModelName},structGroupCnt[p]);
                            model._baseSet(p, subCollection);
                        }else{
                            subModel = fw.model.create(subModelName, structGroupCnt[p]);
                            model._baseSet(p, subModel);
                        }
                    }else{
                        model._baseSet(p, structGroupCnt[p]);
                    }
                } 
            }else if(structGroupType=="update"){

                for(var p in structGroupCnt){
                    fieldType = modelFieldsMap[p]['type'];
                    if(fieldType=="model"){
                        subModelName = modelFieldsMap[p]['model'];
                        subModelRelation = modelFieldsMap[p]['relation'];
                        if(subModelRelation=="many"){
                            mergeCollection(model[p],structGroupCnt[p]);
                        }else{
                            mergeModel(model[p],structGroupCnt[p]);
                        }
                    }else if(fieldType=="array"){
                        model._baseSet(p, structGroupCnt[p]);
                        /*不好判断，暂时直接赋值。mergeArray(model[p],structGroupCnt[p]);*/
                    }else if(fieldType=="object"){
                        mergeObj(model[p],structGroupCnt[p]);
                    }else{
                        model._baseSet(p, structGroupCnt[p]);
                    }
                } 
            }else if(structGroupType=="delete"){
                for(var j=0,jlen = structGroupCnt.length;j<jlen;j++){
                    model._delete(structGroupCnt[j]);
                }
            }

        }
    }