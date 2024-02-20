function mergeObj(obj, struct){
        var structGroupType,structGroupCnt;
        for (var i = 0, ilen = struct.length; i < ilen; i++){
            structGroupType = struct[i].type;
            structGroupCnt = struct[i].cnt;
            if(structGroupType=="insert"){
                for(var p in structGroupCnt){
                    obj[p] = structGroupCnt[p];
                }
            }else if(structGroupType=="update"){
                for(var p in structGroupCnt){
                    obj[p] = structGroupCnt[p];
                }
            }else if(structGroupType=="delete"){
                for(var p,plen=structGroupCnt.length; p<plen; p++){
                    obj[p] = undefined;
                }
            }
        }
    }