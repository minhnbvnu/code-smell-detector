function hasPath$1(object,path,hasFunc){for(var index=-1,length=(path=castPath$2(path,object)).length,result=!1;++index<length;){var key=toKey$3(path[index]);if(!(result=null!=object&&hasFunc(object,key)))break;object=object[key]}return result||++index!=length?result:!!(length=null==object?0:object.length)&&isLength(length)&&isIndex$1(key,length)&&(isArray$2(object)||isArguments(object))}