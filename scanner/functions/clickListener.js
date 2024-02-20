function clickListener(event){
        if(!isBlocked(el,"click")){
          callback.call(el,event);
        }
      }