function baseIsMatch$1(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(null==object)return!length;for(object=Object(object);index--;){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0]in object))return!1}for(;++index<length;){var key=(data=matchData[index])[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(void 0===objValue&&!(key in object))return!1}else{var stack=new Stack$1;if(customizer)var result=customizer(objValue,srcValue,key,object,source,stack);if(!(void 0===result?baseIsEqual$1(srcValue,objValue,COMPARE_PARTIAL_FLAG$1|COMPARE_UNORDERED_FLAG$1,customizer,stack):result))return!1}}return!0}