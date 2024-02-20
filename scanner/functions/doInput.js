function doInput(elem){
      $el = $(elem);
      $el.addClass($el.attr("type"));
      storeElement(elem);
    }