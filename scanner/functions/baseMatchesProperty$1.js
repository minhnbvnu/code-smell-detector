function baseMatchesProperty$1(path,srcValue){return isKey$1(path)&&isStrictComparable(srcValue)?matchesStrictComparable(toKey$2(path),srcValue):function(object){var objValue=get(object,path);return void 0===objValue&&objValue===srcValue?hasIn(object,path):baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG)}}