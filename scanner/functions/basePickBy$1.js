function basePickBy$1(object,paths,predicate){for(var index=-1,length=paths.length,result={};++index<length;){var path=paths[index],value=baseGet(object,path);predicate(value,path)&&baseSet(result,castPath(path,object),value)}return result}