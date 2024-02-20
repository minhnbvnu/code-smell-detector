function loopForTimes( times, callback ) {
  for( var i=0; i < times; i++ ){
    callback(i)
  }
}