function arrayFilter$1(array,predicate){for(var index=-1,length=null==array?0:array.length,resIndex=0,result=[];++index<length;){var value=array[index];predicate(value,index,array)&&(result[resIndex++]=value)}return result}