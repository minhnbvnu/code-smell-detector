function baseSet$1(object,path,value,customizer){if(!isObject$3(object))return object;for(var index=-1,length=(path=castPath$1(path,object)).length,lastIndex=length-1,nested=object;null!=nested&&++index<length;){var key=toKey(path[index]),newValue=value;if("__proto__"===key||"constructor"===key||"prototype"===key)return object;if(index!=lastIndex){var objValue=nested[key];void 0===(newValue=customizer?customizer(objValue,key,nested):void 0)&&(newValue=isObject$3(objValue)?objValue:isIndex(path[index+1])?[]:{})}assignValue$2(nested,key,newValue),nested=nested[key]}return object}