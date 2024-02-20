function storeElement(elem){
      //store this element in our global array
      elem = $(elem).get();
      if(elem.length > 1){
        $.each(elem, function(i, val){
          $.uniform.elements.push(val);
        });
      }else{
        $.uniform.elements.push(elem);
      }
    }