function baseKeysIn$1(object){if(!isObject$2(object))return nativeKeysIn(object);var isProto=isPrototype$1(object),result=[];for(var key in object)("constructor"!=key||!isProto&&hasOwnProperty$1.call(object,key))&&result.push(key);return result}