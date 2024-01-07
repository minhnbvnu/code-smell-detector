function number(group){
    var input = $('#' + group + '-number');
    var val = parseInt( input.value );

    if( isNaN(val) ){
      return 0;
    }

    return val;
  }