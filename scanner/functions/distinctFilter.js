function distinctFilter(array, callback){
    // does the filter with removal of duplicates in O(n)
    var outArr = [];
    var primitives = {};
    for(var i=0,l=array.length; i<l; ++i){
      var value = array[i];
      if(callback(value, i, array)){
        if((typeof value == 'object') && value){
          // with objects we prevent duplicates with a marker property
          if(!value.__included){
            value.__included = true;
            outArr.push(value);
          }
        }else if(!primitives[value + typeof value]){
          // with primitives we prevent duplicates by putting it in a map
          primitives[value + typeof value] = true;
          outArr.push(value);
        }
      }
    }
    for(i=0,l=outArr.length; i<l; ++i){
      // cleanup the marker properties
      if(outArr[i]){
        delete outArr[i].__included;
      }
    }
    return outArr;
  }